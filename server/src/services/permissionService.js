import PermissionRepository from '../repositories/permissionRepository';
import UserGroupsRepository from '../repositories/userGroupsRepository';
import DatabaseRepository from '../repositories/databaseRepository';
import DBTable from '../repositories/dbTableRepository';
import { ACCESS_GRANTED, ACCESS_DENIED, ACCESS_LIMITED, ADMIN_GROUP } from '../config/types';

const getAccessLevel = (groupId, dbTables, permissions) => {
  const total = dbTables.length;
  const groupPermissions = permissions.filter(
    (permission) => permission.userGroups_id === groupId && dbTables.find((table) => table.id === permission.dbtable_id)
  );
  const grantedCount = groupPermissions.filter((permission) => permission.permissionGranted === ACCESS_GRANTED).length;

  if (grantedCount === 0) {
    return ACCESS_DENIED;
  }
  if (grantedCount === total) {
    return ACCESS_GRANTED;
  }
  return ACCESS_LIMITED;
};

// export const getPermissions = async () => {
//   const permissions = await PermissionRepository.getAll();
//   const groups = await UserGroupsRepository.getAll();
//   const databases = await DatabaseRepository.getAll();

//   const result = await Promise.all(
//     databases.map(async (db) => {
//       const groupAccess = await Promise.all(
//         groups.map(async (group) => {
//           const dbTables = await DBTable.getAllByDatabaseId(db.id);
//           const accessLevel = getAccessLevel(group.id, dbTables, permissions);
//           return {
//             groupId: group.id,
//             groupName: group.name,
//             access: accessLevel,
//           };
//         })
//       );
//       return {
//         databaseId: db.id,
//         dbNickname: db.dbNickname,
//         groups: groupAccess,
//       };
//     })
//   );

//   return {
//     permissions: result,
//   };
// };

export const setInitialDBPermissions = async (tableid) => {
  const groups = await UserGroupsRepository.getAll();
  groups.forEach(async (group) => {
    const permission = group.name === ADMIN_GROUP ? ACCESS_GRANTED : ACCESS_DENIED;
    await PermissionRepository.create({
      userGroups_id: group.id,
      permissionGranted: permission,
      dbtable_id: tableid,
    });
  });
};

export const setInitialDBPermissionsOnGroupAdd = async (groupId) => {
  const dbTables = await DBTable.getAll();
  dbTables.forEach(async (table) => {
    const permission = ACCESS_DENIED;
    await PermissionRepository.create({
      userGroups_id: groupId,
      permissionGranted: permission,
      dbtable_id: table.id,
    });
  });
};

// export const getDBPermissions = async (databaseId) => {
//   const permissions = await PermissionRepository.getAll();
//   const groups = await UserGroupsRepository.getAll();
//   const tables = await DBTable.getAllByDatabaseId(databaseId);

//   const result = await Promise.all(
//     tables.map(async (table) => {
//       const groupsAccess = await Promise.all(
//         groups.map(async (group) => {
//           const permission = permissions.find(
//             (permission) => permission.dbtable_id === table.id && permission.userGroups_id === group.id
//           );
//           return {
//             groupId: group.id,
//             groupName: group.name,
//             access: permission.permissionGranted,
//           };
//         })
//       );

//       return {
//         tableId: table.id,
//         tableName: table.name,
//         groups: groupsAccess,
//       };
//     })
//   );

//   return {
//     permissions: result,
//   };
// };

const mapGroups = (data) => {
  return data.map((item) => {
    const { groupId, access, UserGroup } = item;
    return {
      groupId,
      access,
      groupName: UserGroup.groupName,
    };
  });
};

export const getDBPermissions = async (databaseId) => {
  const data = await DBTable.getPermissionsByDatabaseId(databaseId);
  // const result = data.map((item) => {
  //   const { tableId, tableName, Permissions } = item;
  //   console.log(tableId, tableName);
  //   const groups = mapGroups(Permissions);
  //   return {
  //     tableId,
  //     tableName,
  //     groups,
  //   };
  // });
  // return {
  //   permissions: result,
  // };
  return data;
};

// export const getPermissions = async () => DatabaseRepository.getPermissions();
export const getPermissions = async () =>
  DatabaseRepository.getAllowedDatabasesByUserGroup('ccabcf2f-5e5f-4d37-bf32-1d882889b3b4');

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
        if (access !== ACCESS_LIMITED) {
          const TableIds = await DBTable.getTablesIdsByDatabaseId(databaseId);
          await Promise.all(
            TableIds.map(async (data) => {
              PermissionRepository.updatePermissionByGroupIdAndTableId(groupId, data.id, {
                permissionGranted: access,
              });
            })
          );
        } else {
          await Promise.all(
            tables.map(async (data) => {
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
