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
    throw { code: 404, message: `User with id of ${req.params.id} not found` };
  }
  if (dataToUpdate.email && item.email !== dataToUpdate.email) {
    if (await UserRepository.getByEmail(dataToUpdate.email)) {
      throw { code: 409, message: 'This email is assigned to another user' };
    }
  }
  if (dataToUpdate.oldPassword) {
    if (dataToUpdate.oldPassword !== item.password) {
      throw { code: 409, message: 'Wrong current password' };
    } else if (dataToUpdate.password === item.password) {
      throw { code: 409, message: 'New password cannot match the current one' };
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
    return null;
  }
  return item;
};
