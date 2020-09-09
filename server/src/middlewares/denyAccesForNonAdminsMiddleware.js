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

  const mailPattern = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  if (req.body.password && req.user.id !== req.params.id) {
    throw createError(403, "Change of other user's password is prohibited");
  }
  if (req.body.id) {
    throw createError(403, 'Change of user id is prohibited');
  }
  if (req.body.lastLogin) {
    throw createError(403, 'Change of user last login date is prohibited');
  }
  if (req.body.firstName === '') {
    throw createError(400, 'First name cannot be empty');
  }
  if (req.body.lastName === '') {
    throw createError(400, 'Last name cannot be empty');
  }
  if (!mailPattern.test(req.body.email)) {
    throw createError(400, 'Email is invalid');
  }
  return next();
};
