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
    databases.map(async (db) => {
      const groupAccess = await Promise.all(
        groups.map(async (group) => {
          const dbTables = await DBTable.getTablesByDatabaseId({
            id: db.id,
          });
          const accessLevel = getAccessLevel(group.id, dbTables, permissions);
          return {
            groupId: group.id,
            groupName: group.name,
            access: accessLevel,
          };
        })
      );
      return {
        databaseId: db.id,
        dbNickname: db.dbNickname,
        groups: groupAccess,
      };
    })
  );

  return {
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
  console.log(tables, 'taaaadsasdasd');

  const result = await Promise.all(
    tables.map(async (table) => {
      const groupsAccess = await Promise.all(
        groups.map(async (group) => {
          const permission = permissions.find(
            (permission) => permission.dbtable_id === table.id && permission.userGroups_id === group.id
          );
          return {
            groupId: group.id,
            groupName: group.name,
            access: permission.permissionGranted,
          };
        })
      );

      return {
        tableId: table.id,
        tableName: table.name,
        groups: groupsAccess,
      };
    })
  );

  return {
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

export const updatePermissions = async ({ permissions }) => {
  await Promise.all(
    permissions.map(async (permission) => {
      const { databaseId, groups } = permission;
      groups.map(async (group) => {
        const { groupId, access, tables } = group;
        let accessLevel;
        if (access === 'granted') {
          accessLevel = true;
        }
        if (access === 'denied') {
          accessLevel = false;
        }
        if (access !== 'limited') {
          const TableIds = await DBTable.getTablesIdsByDatabaseId(databaseId);
          await Promise.all(
            TableIds.map(async (data) => {
              PermissionRepository.updatePermissionByGroupIdAndTableId(groupId, data.id, {
                permissionGranted: accessLevel,
              });
            })
          );
        } else {
          await Promise.all(
            tables.map(async (data) => {
              console.log(data.id);
              PermissionRepository.updatePermissionByGroupIdAndTableId(groupId, data.tableId, {
                permissionGranted: data.access,
              });
            })
          );
        }
      });
    })
  );
  return 'success';
};
