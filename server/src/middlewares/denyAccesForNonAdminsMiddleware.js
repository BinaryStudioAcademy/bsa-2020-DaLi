import createError from 'http-errors';
import * as UserGroupsService from '../services/userGroupsService';

export const denyAccessForNonAdmins = async (req, res, next) => {
  const userGroups = await UserGroupsService.getGroupsByUser(req.user.id);
  const userGroupsName = userGroups.map((group) => group.UserGroup.name);

  if (!userGroupsName.includes('Administrators')) {
    const error = createError(409, 'You do not have admin rights');
    return next(error);
  }
  return next();
};

export const secureUserUpdate = async (req, res, next) => {
  const userGroups = await UserGroupsService.getGroupsByUser(req.user.id);
  const userGroupsName = userGroups.map((group) => group.UserGroup.name);

  if (!userGroupsName.includes('Administrators') && req.params.id !== req.user.id) {
    const error = createError(409, 'You can not update user');
    return next(error);
  }
  return next();
};
