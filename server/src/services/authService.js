import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import jwtConfig from '../config/jwt.config';
import UserRepository from '../repositories/userRepository';

export const login = async (user) => {
  const candidate = await UserRepository.getByEmail(user.email);
  if (candidate) {
    // hashed password
    // if (bcrypt.compareSync(user.password, candidate.password)) {
    // not hashed password
    if (!candidate.isActive) {
      throw createError(403, 'User account deactivated');
    }
    if (candidate.password === user.password) {
      const { id, email, firstName, lastName } = candidate;
      await UserRepository.updateById({ id }, { lastLogin: new Date(Date.now()) });
      const token = jwt.sign(
        {
          id,
        },
        jwtConfig.secretKey,
        { expiresIn: jwtConfig.expiresIn }
      );
      return {
        status: 200,
        response: {
          success: true,
          token,
          user: { id, email, firstName, lastName },
        },
      };
    }
    throw createError(401, 'Wrong password entered');
  }
  throw createError(404, 'User with such email was not found');
};

export const register = async (user) => {
  const candidate = await UserRepository.getByEmail(user.email);
  if (!candidate) {
    const salt = bcrypt.genSaltSync(10);
    const newUser = await UserRepository.createUsersWithDefaultGroups({
      ...user,
      password: bcrypt.hashSync(user.password, salt),
    });
    return {
      status: 201,
      response: {
        success: true,
        user: newUser,
      },
    };
  }
  throw createError(409, 'User with such email already exists');
};

export const getUserByToken = async (token) => {
  const { id } = jwtDecode(token);
  const candidate = await UserRepository.getById({ id });
  if (!candidate) {
    throw createError(404, 'User not found');
  }

  const { firstName, lastName, email } = candidate;
  return {
    status: 200,
    response: {
      success: true,
      token: token.replace('Bearer ', ''),
      user: { id, email, firstName, lastName },
    },
  };
};
