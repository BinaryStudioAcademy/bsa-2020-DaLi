import createError from 'http-errors';
import UserRepository from '../repositories/userRepository';
import { encrypt, compare } from '../helpers/cryptoHelper';

export const getUsers = async () => {
  const result = await UserRepository.getAll();
  return result;
};

export const createUser = async (user) => {
  if (await UserRepository.getByEmail(user.email)) {
    throw createError(409, 'This email is assigned to another user');
  }
  const password = user.password ? user.password : '';
  const result = await UserRepository.createUsersWithDefaultGroups({
    ...user,
    password: await encrypt(user.password),
  });

  if (password) result.password = password;

  return result;
};

export const deleteUser = async (id) => {
  const item = await UserRepository.getById(id);
  if (!item) {
    throw createError(404, `User with id of ${id} not found`);
  }
  const result = await UserRepository.deleteById(id);
  return result;
};

export const updateUser = async (id, dataToUpdate) => {
  const item = await UserRepository.getById(id);
  if (!item) {
    throw createError(404, `User with id of ${id} not found`);
  }
  if (dataToUpdate.email && item.email !== dataToUpdate.email) {
    if (await UserRepository.getByEmail(dataToUpdate.email)) {
      throw createError(409, 'This email is assigned to another user');
    }
  }

  if (dataToUpdate.oldPassword) {
    const currentPassword = await compare(dataToUpdate.oldPassword, item.password);

    if (!currentPassword) {
      throw createError(409, 'Wrong current password');
    } else if (await compare(dataToUpdate.password, item.password)) {
      throw createError(409, 'New password cannot match the current one');
    } else {
      delete dataToUpdate.oldPassword;
    }
  }

  const password = dataToUpdate.password ? dataToUpdate.password : '';
  const result = await UserRepository.updateById(id, {
    ...dataToUpdate,
    password: await encrypt(dataToUpdate.password),
  });

  if (password) result.password = password;

  return result;
};

export const getUser = async (id) => {
  const item = await UserRepository.getById(id);
  if (!item) {
    throw createError(404, `User with id of ${id} not found`);
  }
  return item;
};
