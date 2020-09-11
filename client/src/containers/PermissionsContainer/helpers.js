/* eslint-disable no-nested-ternary */
export const checkIsTablePermissionExist = (tables, databaseId) => {
  return tables.some((item) => {
    return item.databaseId === databaseId;
  });
};

export const getCurrentDatabaseTablesPermissions = (databaseId, tablesPermissions) => {
  return tablesPermissions.filter((item) => item.databaseId === databaseId)[0]?.tables;
};

export const getCurrentDatabaseTitle = (databaseId, databasesPermissions) => {
  return databasesPermissions.filter((item) => item.databaseId === databaseId)[0]?.dbNickname;
};

const updateTablesPermissionsAccess = (currentTablesPermissions, databaseId, groupId, accessType) => {
  const currentDatabaseIndex = currentTablesPermissions.findIndex((item) => item.databaseId === databaseId);
  const isDatabaseTablesExist = currentDatabaseIndex !== -1;
  if (!isDatabaseTablesExist) {
    return currentTablesPermissions;
  }
  const currentDatabase = currentTablesPermissions[currentDatabaseIndex];
  const updatedDatabaseTables = currentDatabase.tables.map((item) => ({
    ...item,
    groups: item.groups.map((item) => (item.groupId === groupId ? { ...item, access: accessType } : item)),
  }));

  return [
    ...currentTablesPermissions.slice(0, currentDatabaseIndex),
    { ...currentDatabase, tables: updatedDatabaseTables },
    ...currentTablesPermissions.slice(currentDatabaseIndex + 1),
  ];
};

export const updateDatabasesPermissionsState = (
  currentDatabasesPermissions,
  currentTablesPermissions,
  databaseId,
  groupId,
  accessType
) => {
  const updatedDatabasesPermission = currentDatabasesPermissions.map((item) => {
    if (item.databaseId === databaseId) {
      return {
        ...item,
        groups: item.groups.map((group) => {
          if (group.groupId === groupId) {
            return {
              ...group,
              access: accessType,
            };
          }
          return group;
        }),
      };
    }
    return item;
  });
  const updatedTablesPermissionsAccess = updateTablesPermissionsAccess(
    currentTablesPermissions,
    databaseId,
    groupId,
    accessType
  );
  return [updatedDatabasesPermission, updatedTablesPermissionsAccess];
};

export const updateCollectionsPermissionsState = (currentCollectionsPermissions, collectionId, groupId, accessType) => {
  const updatedDatabasesPermission = currentCollectionsPermissions.map((item) => {
    if (item.id === collectionId) {
      return {
        ...item,
        groups: item.groups.map((group) => {
          if (group.groupId === groupId) {
            return {
              ...group,
              access: accessType,
            };
          }
          return group;
        }),
      };
    }
    return item;
  });

  return updatedDatabasesPermission;
};

export const updateDataPermissionsChangesState = (
  initDataPermissions,
  currentChanges,
  dataId,
  groupId,
  accessType,
  dataType
) => {
  const dataIdProperty = dataType === 'collection' ? 'collectionId' : 'databaseId';
  const changedDataIndex = currentChanges.findIndex((item) => item[dataIdProperty] === dataId);
  const isDataNotChanged = changedDataIndex === -1;
  if (isDataNotChanged) {
    const newChangedDatabase = { [dataIdProperty]: dataId, groups: [{ groupId, access: accessType }] };
    return [...currentChanges, newChangedDatabase];
  }

  const oldDataPermissions = currentChanges[changedDataIndex];
  const changedDataGroupIndex = currentChanges[changedDataIndex].groups.findIndex((item) => item.groupId === groupId);

  const isGroupNotChanged = changedDataGroupIndex === -1;
  if (isGroupNotChanged) {
    const updatedDataPermissions = {
      ...oldDataPermissions,
      groups: oldDataPermissions.groups.concat({ groupId, access: accessType }),
    };
    return [
      ...currentChanges.slice(0, changedDataIndex),
      updatedDataPermissions,
      ...currentChanges.slice(changedDataIndex + 1),
    ];
  }

  const initDataPermissionGroupAccess = initDataPermissions
    .filter((item) => item.id === dataId)[0]
    .groups.filter((item) => item.groupId === groupId)[0].access;

  if (initDataPermissionGroupAccess === accessType) {
    const updatedGroups = [
      ...oldDataPermissions.groups.slice(0, changedDataGroupIndex),
      ...oldDataPermissions.groups.slice(changedDataGroupIndex + 1),
    ];
    if (!updatedGroups.length) {
      return [...currentChanges.slice(0, changedDataIndex), ...currentChanges.slice(changedDataIndex + 1)];
    }
    const updatedDataPermissions = {
      ...oldDataPermissions,
      groups: updatedGroups,
    };
    return [
      ...currentChanges.slice(0, changedDataIndex),
      updatedDataPermissions,
      ...currentChanges.slice(changedDataIndex + 1),
    ];
  }

  const updatedDataPermissionsGroup = { groupId, access: accessType };
  const updatedDataPermissions = {
    ...oldDataPermissions,
    groups: [
      ...oldDataPermissions.groups.slice(0, changedDataGroupIndex),
      updatedDataPermissionsGroup,
      ...oldDataPermissions.groups.slice(changedDataGroupIndex + 1),
    ],
  };
  return [
    ...currentChanges.slice(0, changedDataIndex),
    updatedDataPermissions,
    ...currentChanges.slice(changedDataIndex + 1),
  ];
};

const changeDatabasePermissionsAccess = (currentDatabasePermissions, updatedTablesPermission, databaseId, groupId) => {
  const currentTables = updatedTablesPermission.filter((item) => item.databaseId === databaseId)[0].tables;
  const tablesCurrentGroupPermissions = currentTables.map(
    (item) => item.groups.filter((item) => item.groupId === groupId)[0].access
  );
  const isAllTablesGranted = tablesCurrentGroupPermissions.every((access) => access === 'granted');
  const isAllTablesDenied = tablesCurrentGroupPermissions.every((access) => access === 'denied');
  const accessType = isAllTablesGranted ? 'granted' : isAllTablesDenied ? 'denied' : 'limited';

  const updatedDatabasesPermission = currentDatabasePermissions.map((item) => {
    if (item.databaseId === databaseId) {
      return {
        ...item,
        groups: item.groups.map((group) => {
          if (group.groupId === groupId) {
            return {
              ...group,
              access: accessType,
            };
          }
          return group;
        }),
      };
    }
    return item;
  });

  return updatedDatabasesPermission;
};

export const updateTablesPermissionsState = (
  currentTablesPermissions,
  currentDatabasePermissions,
  databaseId,
  tableId,
  groupId,
  accessType
) => {
  const updatedTablesPermission = currentTablesPermissions.map((item) => {
    if (item.databaseId === databaseId) {
      return {
        ...item,
        tables: item.tables.map((table) => {
          if (table.tableId === tableId) {
            return {
              ...table,
              groups: table.groups.map((group) => {
                if (group.groupId === groupId) {
                  return {
                    ...group,
                    access: accessType,
                  };
                }
                return group;
              }),
            };
          }
          return table;
        }),
      };
    }
    return item;
  });

  const updatedDatabasesPermission = changeDatabasePermissionsAccess(
    currentDatabasePermissions,
    updatedTablesPermission,
    databaseId,
    groupId
  );
  return [updatedDatabasesPermission, updatedTablesPermission];
};

export const updateTablesPermissionsChangesState = (
  initDatabasesPermissions,
  initTablesPermissions,
  currentChanges,
  databaseId,
  tableId,
  groupId,
  accessType
) => {
  const changedDatabaseIndex = currentChanges.findIndex((item) => item.databaseId === databaseId);
  const isDatabaseNotChanged = changedDatabaseIndex === -1;

  if (isDatabaseNotChanged) {
    const newChangedDatabase = {
      databaseId,
      groups: [{ groupId, access: 'limited', tables: [{ tableId, access: accessType }] }],
    };
    return [...currentChanges, newChangedDatabase];
  }

  const oldDatabasePermissions = currentChanges[changedDatabaseIndex];
  const changedDatabaseGroupIndex = currentChanges[changedDatabaseIndex].groups.findIndex(
    (item) => item.groupId === groupId
  );

  const isGroupNotChanged = changedDatabaseGroupIndex === -1;
  if (isGroupNotChanged) {
    const updatedDatabasePermissions = {
      ...oldDatabasePermissions,
      groups: oldDatabasePermissions.groups.concat({
        groupId,
        access: 'limited',
        tables: [{ tableId, access: accessType }],
      }),
    };
    return [
      ...currentChanges.slice(0, changedDatabaseIndex),
      updatedDatabasePermissions,
      ...currentChanges.slice(changedDatabaseIndex + 1),
    ];
  }

  const oldDatabasePermissionsGroup = oldDatabasePermissions.groups[changedDatabaseGroupIndex];
  const isTablesExist = oldDatabasePermissionsGroup.tables;
  if (!isTablesExist) {
    const updatedDatabasePermissionsGroup = {
      ...oldDatabasePermissionsGroup,
      access: 'limited',
      tables: [{ tableId, access: accessType }],
    };
    const updatedDatabasePermissions = {
      ...oldDatabasePermissions,
      groups: [
        ...oldDatabasePermissions.groups.slice(0, changedDatabaseGroupIndex),
        updatedDatabasePermissionsGroup,
        ...oldDatabasePermissions.groups.slice(changedDatabaseGroupIndex + 1),
      ],
    };
    return [
      ...currentChanges.slice(0, changedDatabaseIndex),
      updatedDatabasePermissions,
      ...currentChanges.slice(changedDatabaseIndex + 1),
    ];
  }
  const isTableAlreadyChanged = oldDatabasePermissionsGroup.tables.filter((item) => item.tableId === tableId);
  if (isTableAlreadyChanged.length) {
    const updatedTables = oldDatabasePermissionsGroup.tables.filter((item) => item.tableId !== tableId);
    if (!updatedTables.length) {
      const updatedGroups = [
        ...oldDatabasePermissions.groups.slice(0, changedDatabaseGroupIndex),
        ...oldDatabasePermissions.groups.slice(changedDatabaseGroupIndex + 1),
      ];
      if (!updatedGroups.length) {
        return [...currentChanges.slice(0, changedDatabaseIndex), ...currentChanges.slice(changedDatabaseIndex + 1)];
      }
      const updatedDatabasePermissions = {
        ...oldDatabasePermissions,
        groups: updatedGroups,
      };
      return [
        ...currentChanges.slice(0, changedDatabaseIndex),
        updatedDatabasePermissions,
        ...currentChanges.slice(changedDatabaseIndex + 1),
      ];
    }
    const updatedDatabasePermissionsGroup = {
      ...oldDatabasePermissionsGroup,
      access: 'limited',
      tables: updatedTables,
    };
    const updatedDatabasePermissions = {
      ...oldDatabasePermissions,
      groups: [
        ...oldDatabasePermissions.groups.slice(0, changedDatabaseGroupIndex),
        updatedDatabasePermissionsGroup,
        ...oldDatabasePermissions.groups.slice(changedDatabaseGroupIndex + 1),
      ],
    };
    return [
      ...currentChanges.slice(0, changedDatabaseIndex),
      updatedDatabasePermissions,
      ...currentChanges.slice(changedDatabaseIndex + 1),
    ];
  }
  const updatedDatabasePermissionsGroup = {
    ...oldDatabasePermissionsGroup,
    access: 'limited',
    tables: oldDatabasePermissionsGroup.tables.concat({ tableId, access: accessType }),
  };
  const updatedDatabasePermissions = {
    ...oldDatabasePermissions,
    groups: [
      ...oldDatabasePermissions.groups.slice(0, changedDatabaseGroupIndex),
      updatedDatabasePermissionsGroup,
      ...oldDatabasePermissions.groups.slice(changedDatabaseGroupIndex + 1),
    ],
  };
  return [
    ...currentChanges.slice(0, changedDatabaseIndex),
    updatedDatabasePermissions,
    ...currentChanges.slice(changedDatabaseIndex + 1),
  ];
};
