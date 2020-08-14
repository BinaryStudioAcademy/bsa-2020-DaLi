import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import bcrypt from 'bcrypt';
import moment from 'moment';
import UserRepository from '../repositories/userRepository';
import jwtConfig from '../config/jwt.config';

export const login = async (user) => {
  const candidate = await UserRepository.getByEmail(user.email);
  if (candidate) {
    // hashed password
    // if (bcrypt.compareSync(user.password, candidate.password)) {
    // not hashed password
    if (candidate.password === user.password) {
      const { id, email, firstName, lastName } = candidate;
      const token = jwt.sign(
        {
          id,
        },
        jwtConfig.secretKey,
        { expiresIn: jwtConfig.expiresIn }
      );
      await UserRepository.updateDate(id);
      return {
        status: 200,
        response: {
          success: true,
          token,
          user: { id, email, firstName, lastName },
        },
      };
    }
    return {
      status: 401,
      response: {
        success: false,
        message: 'Wrong password entered',
      },
    };
  }
  return {
    status: 404,
    response: {
      success: false,
      message: 'User with such email was not found',
    },
  };
};

export const register = async (user) => {
  const candidate = await UserRepository.getByEmail(user.email);
  if (!candidate) {
    const salt = bcrypt.genSaltSync(10);
    const password = user.password;
    candidate.password = bcrypt.hashSync(password, salt);

    const newUser = await UserRepository.create(candidate);
    return {
      status: 201,
      response: {
        success: true,
        user: newUser,
      },
    };
  }
  return {
    status: 409,
    response: {
      success: false,
      message: 'User with such email already exists',
    },
  };
};

export const getUserByToken = async (token) => {
  const { id } = jwtDecode(token);
  const candidate = await UserRepository.getById({ id });
  if (!candidate) {
    return {
      status: 404,
      response: {
        success: false,
        message: 'User not found',
      },
    };
  }
  const { firstName, lastName, email, updatedAt } = candidate;
  const start = moment(updatedAt);
  const end = moment(new Date());
  const tokenTerm = end.diff(start, 'days');
  if (tokenTerm > 30) {
    return {
      status: 404,
      response: {
        success: false,
        message: 'Token expired',
      },
    };
  }
  await UserRepository.updateDate(id);
  return {
    status: 200,
    response: {
      success: true,
      token: token.replace('Bearer ', ''),
      user: { id, email, firstName, lastName },
    },
  };
};
