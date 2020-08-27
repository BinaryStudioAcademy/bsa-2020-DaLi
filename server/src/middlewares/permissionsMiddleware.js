import * as PermissionService from '../services/permissionService';
import * as UserGroupsService from '../services/userGroupsService';

export const permissionsMiddleware = async (req, res) => {
  const userGroups = await UserGroupsService.getGroupsByUser(req.user.id);
  const userGroupsName = userGroups.map((group) => group.UserGroup.name);

  if (userGroupsName.indexOf('Administrators') !== -1) {
    return res.send(res.data);
  }

  let permissionsRules;
  if (req.path.includes('tables')) {
    permissionsRules = await PermissionService.getDBPermissions(req.params.id);
  } else {
    permissionsRules = await PermissionService.getPermissions();
  }

  const userGroupsId = userGroups.map((group) => group.userGroups_id);

  let dataId = [];
  permissionsRules.permissions.forEach((permission) => {
    const accessStatus = permission.groups.filter(
      (group) =>
        (group.access === 'granted' || group.access === 'limited') && userGroupsId.indexOf(group.groupId) !== -1
    );

    if (accessStatus.length) {
      dataId = req.path.includes('tables') ? [...dataId, permission.tableId] : [...dataId, permission.databaseId];
    }

    return dataId;
  });

  if (!Array.isArray(res.data)) {
    const data = Array(res.data).filter((item) => dataId.indexOf(item.id) !== -1);
    return res.send(...data);
  }

  const data = res.data.filter((item) => dataId.indexOf(item.id) !== -1);
  return res.send(data);
};
