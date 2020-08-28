/* eslint-disable */
import createError from 'http-errors';
import UserRepository from '../repositories/userRepository';

export const getUsers = async () => {
  const result = await UserRepository.getAll();
  return result;
};

export const createUser = async (data) => {
  if (await UserRepository.getByEmail(data.email)) {
    throw createError(409, 'This email is assigned to another user');
  }
  const result = await UserRepository.createUsersWithDefaultGroups(data);
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
    if (dataToUpdate.oldPassword !== item.password) {
      throw createError(409, 'Wrong current password');
    } else if (dataToUpdate.password === item.password) {
      throw createError(409, 'New password cannot match the current one');
    } else {
      delete dataToUpdate.oldPassword;
    }
  }

  const result = await UserRepository.updateById(id, dataToUpdate);
  return result;
};

export const getUser = async (id) => {
  const item = await UserRepository.getById(id);
  if (!item) {
    throw createError(404, `User with id of ${id} not found`);
  }
  return item;
};
