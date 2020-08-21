import * as PermissionService from '../services/permissionService';
import * as UserGroupsService from '../services/userGroupsService';
import * as AuthService from '../services/authService';

export const permissionsMiddleware = async (req, res) => {
  // Need update token logic, after fix passport
  const token = req.headers.authorization;
  const { response } = await AuthService.getUserByToken(token);

  const userGroups = await UserGroupsService.getGroupsByUser(response.user.id);
  const userGroupsName = userGroups.map((group) => group.UserGroup.name);

  if (userGroupsName.indexOf('Administrators') !== -1) {
    return res.send(res.data);
  }

  let permissionsRules;
  if (req.path.includes('tables')) {
    permissionsRules = await PermissionService.getDBPermissions({ id: req.params.id });
  } else {
    permissionsRules = await PermissionService.getPermissions();
  }

  console.log(userGroups);
  const userGroupsId = userGroups.map((group) => group.userGroups_id);
  // Change access status for test
  permissionsRules.permissions[0].groups[0].access = false;

  let dataId = [];
  permissionsRules.permissions.forEach((elem) => {
    let accessStatus;

    if (req.path.includes('tables')) {
      accessStatus = elem.groups.filter((el) => el.access !== false && userGroupsId.indexOf(el.groupId) !== -1);
    } else {
      accessStatus = elem.groups.filter(
        (el) => (el.access === 'granted' || el.access === 'limited') && userGroupsId.indexOf(el.groupId) !== -1
      );
    }

    if (accessStatus.length) {
      dataId = req.path.includes('tables') ? [...dataId, elem.tableId] : [...dataId, elem.databaseId];
    }
    return dataId;
  });

  const data = res.data.filter((elem) => dataId.indexOf(elem.id) !== -1);

  return res.send(data);
};
