import UserGroupsRepository from '../repositories/userGroupsRepository';
import UsersUserGroupsRepository from '../repositories/usersUserGroupsRepository';

export const getUserGroups = async () => {
  const result = await UserGroupsRepository.getAll();
  return result;
};

export const createUserGroup = async (data) => {
  const result = await UserGroupsRepository.create(data);
  return result;
};

export const deleteUserGroup = async (id) => {
  const item = await UserGroupsRepository.getById(id);
  if (!item) {
    return null;
  }
  const result = await UserGroupsRepository.deleteById(id);
  return result;
};

export const updateUserGroup = async (id, dataToUpdate) => {
  const item = await UserGroupsRepository.getById(id);
  if (!item) {
    return null;
  }
  const result = await UserGroupsRepository.updateById(id, dataToUpdate);
  return result;
};

export const getUserGroup = async (id) => {
  const item = await UserGroupsRepository.getWithUsers(id.id);
  if (!item) {
    return null;
  }
  return item[0];
};

export const addUser = async (data) => {
  const result1 = await UsersUserGroupsRepository.create(data);
  if (!result1) {
    return null;
  }
  const result = await getUserGroup({ id: data.userGroups_id });
  return result;
};

export const deleteUser = async (id) => {
  const item = await UsersUserGroupsRepository.getById(id);
  if (!item) {
    return null;
  }
  const result = await UsersUserGroupsRepository.deleteById(id);
  return result;
};

export const getGroupsByUser = async (id) => {
  const item = await UsersUserGroupsRepository.getGroupsByUser(id);
  if (!item) {
    return null;
  }
  return item;
};
