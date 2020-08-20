import PermissionRepository from '../repositories/permissionRepository';
import UserGroupsRepository from '../repositories/userGroupsRepository';
import DatabaseRepository from '../repositories/databaseRepository';
import DBTable from '../repositories/dbTableRepository';

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

  const result = await Promise.all(
    groups.map(async (group) => {
      const dbAccess = await Promise.all(
        databases.map(async (db) => {
          const dbTables = await DBTable.getTablesByDatabaseId({
            id: db.id,
          });
          const accessLevel = getAccessLevel(group.id, dbTables, permissions);
          return {
            databaseId: db.id,
            access: accessLevel,
          };
        })
      );
      return {
        groupId: group.id,
        databases: dbAccess,
      };
    })
  );

  return {
    databases,
    groups,
    permissions: result,
  };
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

export const getDBPermissions = async (databaseId) => {
  const permissions = await PermissionRepository.getAll();
  const groups = await UserGroupsRepository.getAll();
  const tables = await DBTable.getTablesByDatabaseId(databaseId);

  const result = await Promise.all(
    groups.map(async (group) => {
      const tablesAccess = await Promise.all(
        tables.map(async (table) => {
          const permission = permissions.find(
            (permission) => permission.dbtable_id === table.id && permission.userGroups_id === group.id
          );
          return {
            tableId: table.id,
            access: permission.permissionGranted,
          };
        })
      );

      return {
        groupId: group.id,
        tables: tablesAccess,
      };
    })
  );

  return {
    tables,
    groups,
    permissions: result,
  };
};

export const updateDBPermissions = async (permissions) => {
  const result = await Promise.all(
    permissions.map(async (permission) => {
      const result = await PermissionRepository.updateById({ id: permission.id }, permission);
      return result;
    })
  );
  return result;
};
