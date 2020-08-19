import PermissionRepository from '../repositories/permissionRepository';
import UserGroupsRepository from '../repositories/userGroupsRepository';
import DatabaseRepository from '../repositories/databaseRepository';
import DBTable from '../repositories/dbTableRepository';

const getDatabaseTables = (database, tables) => {
  return tables.filter((table) => table.DatabaseId === database.id);
};

const getAccessLevel = (groupId, dbTables, permissions) => {
  const total = dbTables.length;
  const groupPermissions = permissions.filter(
    (permission) => permission.userGroups_id === groupId && dbTables.find((table) => table.id === permission.dbtable_id)
  );
  const grantedCount = groupPermissions.filter((permission) => permission.permissionGranted).length;

  if (grantedCount === 0) {
    return 'denied';
  }
  if (grantedCount === total) {
    return 'granted';
  }
  return 'limited';
};

export const getPermissions = async () => {
  const permissions = await PermissionRepository.getAll();
  const groups = await UserGroupsRepository.getAll();
  const databases = await DatabaseRepository.getAll();
  const tables = await DBTable.getAll();

  const result = groups.map((group) => {
    const dbAccess = databases.map((db) => {
      const dbTables = getDatabaseTables(db, tables);
      return { databaseId: db.id, access: getAccessLevel(group.id, dbTables, permissions) };
    });
    return { groupId: group.id, databases: dbAccess };
  });

  return { databases, groups, permissions: result };
};

export const setInitialDBPermissions = async (tableid) => {
  const groups = await UserGroupsRepository.getAll();
  groups.forEach(async (group) => {
    const permission = group.name === 'Administrators';
    await PermissionRepository.create({
      userGroups_id: group.id,
      permissionGranted: permission,
      dbtable_id: tableid,
    });
  });
};
