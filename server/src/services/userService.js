import UserRepository from '../repositories/userRepository';

export const getUsers = async () => {
  const result = await UserRepository.getAll();
  return result;
};

export const createUser = async (data) => {
  const result = await UserRepository.create(data);
  return result;
};

export const deleteUser = async (id) => {
  const item = await UserRepository.getById(id);
  if (!item) {
    return null;
  }
  const result = await UserRepository.deleteById(id);
  return result;
};

export const updateUser = async (id, dataToUpdate) => {
  const item = await UserRepository.getById(id);
  if (!item) {
    return null;
  }
  const result = await UserRepository.updateById(id, dataToUpdate);
  return result;
};

export const getUser = async (id) => {
  const item = await UserRepository.getById(id);
  if (!item) {
    return null;
  }
  return item;
};