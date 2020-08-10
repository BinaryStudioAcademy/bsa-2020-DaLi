import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/userRepository';
import jwtConfig from '../config/jwt.config';

export const login = async (user) => {
  const candidate = await UserRepository.getByEmail(user.email);
  if (candidate) {
    // hashed password
    // if (bcrypt.compareSync(user.password, candidate.password)) {
    // not hashed password
    if (candidate.password === user.password) {
      const token = jwt.sign(
        {
          id: candidate.id,
        },
        jwtConfig.secretKey,
        { expiresIn: jwtConfig.expiresIn }
      );
      return {
        success: true,
        token: `Bearer ${token}`,
      };
    }
    return {
      success: false,
      message: 'Wrong password entered',
    };
  }
  return {
    success: false,
    message: 'User with such email was not found',
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
      success: true,
      user: newUser,
    };
  }
  return {
    success: false,
    message: 'User with such email already exists',
  };
};

export const getUserByToken = async (token) => {
  const { id } = jwtDecode(token);
  const { firstName, lastName, email } = await UserRepository.getById({ id });
  return { firstName, lastName, email };
};
