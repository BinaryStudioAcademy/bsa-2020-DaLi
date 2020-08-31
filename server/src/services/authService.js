import createError from 'http-errors';
import UserRepository from '../repositories/userRepository';
import { createToken } from '../helpers/tokenHelper';
import { encryptSync } from '../helpers/cryptoHelper';

export const login = async (data) => {
  const currentUser = await UserRepository.getUserById(data.id);
  if (!currentUser.isActive) {
    throw createError(403, 'User account deactivated');
  }
  const { id, email, firstName, lastName } = currentUser;
  await UserRepository.updateById({ id }, { lastLogin: new Date(Date.now()) });
  return {
    token: createToken({ id }),
    user: { id, email, firstName, lastName },
  };
};

export const register = async (user) => {
  const candidate = await UserRepository.getByEmail(user.email);
  if (!candidate) {
    await UserRepository.createUsersWithDefaultGroups({
      ...user,
      password: encryptSync(user.password),
    });
    return {
      status: 'Register success',
    };
  }
};

export const autoLogin = async (id, token) => {
  const candidate = await UserRepository.getById({ id });
  const { firstName, lastName, email } = candidate;
  return {
    token: token.split(' ')[1],
    user: { id, email, firstName, lastName },
  };
};
