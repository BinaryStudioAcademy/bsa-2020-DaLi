import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/userRepository';
import jwtConfig from '../config/jwt.config';

export const login = async (user) => {
  const candidate = await UserRepository.getByEmail(user.email);
  if (candidate) {
    if (candidate.password === user.password) {
      const token = jwt.sign(
        {
          email: candidate.email,
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
