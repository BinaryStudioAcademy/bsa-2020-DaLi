import createError from 'http-errors';
import UserGroupsRepository from '../repositories/userGroupsRepository';
import UsersUserGroupsRepository from '../repositories/usersUserGroupsRepository';
import { setInitialDBPermissionsOnGroupAdd } from './permissionService';

export const getUserGroups = async () => {
  const result = await UserGroupsRepository.getAllWithUsers();
  return result;
};

export const createUserGroup = async (data) => {
  try {
    const result = await UserGroupsRepository.create(data);
    await setInitialDBPermissionsOnGroupAdd(result.id);
    return result;
  } catch (err) {
    throw createError(400, err.message);
  }
};

export const deleteUserGroup = async (id) => {
  const item = await UserGroupsRepository.getById(id);
  if (!item) {
    throw createError(404, `User group with id of ${id.id} not found`);
  }
  const result = await UserGroupsRepository.deleteById(id);
  return result;
};

export const updateUserGroup = async (id, dataToUpdate) => {
  const item = await UserGroupsRepository.getById(id);
  if (!item) {
    throw createError(404, `User group with id of ${id.id} not found`);
  }
  const result = await UserGroupsRepository.updateById(id, dataToUpdate);
  return result;
};

export const getUserGroup = async (id) => {
  const item = await UserGroupsRepository.getWithUsers(id.id);
  if (!item) {
    throw createError(404, `User group with id of ${id.id} not found`);
  }
  return item[0];
};

export const getAllGroupsWithUsers = async () => {
  const item = await UserGroupsRepository.getAllGroupsWithUsers();
  if (!item) {
    throw createError(404, 'No groups with users found');
  }
  return item;
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
    throw createError(404, `No records with id ${id} found in UserUserGroups table`);
  }
  const result = await UsersUserGroupsRepository.deleteById(id);
  return result;
};

export const getGroupsByUser = async (id) => {
  const item = await UsersUserGroupsRepository.getGroupsByUser(id);
  if (!item) {
    throw createError(404, `No groups for user with id of ${id.id} found in UserUserGroups table`);
  }
  return item;
};
