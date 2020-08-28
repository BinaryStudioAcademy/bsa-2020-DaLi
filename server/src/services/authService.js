import UserRepository from '../repositories/userRepository';
import { createToken } from '../helpers/tokenHelper';
import { encrypt } from '../helpers/cryptoHelper';

export const login = async (data) => {
  const currentUser = await UserRepository.getUserById(data.id);
  const { id, email, firstName, lastName } = currentUser;
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
      password: await encrypt(user.password),
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
