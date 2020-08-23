import {
  GET_DATABASES_PERMISSIONS,
  GET_TABLES_PERMISSIONS,
  UPDATE_DATABASES_PERMISSIONS,
  UPDATE_TABLES_PERMISSIONS,
  SAVE_CHANGES,
  CANCEL_CHANGES,
} from './actionsTypes';

export const getDatabasesPermissions = () => {
  return {
    type: GET_DATABASES_PERMISSIONS,
  };
};

export const getTablesPermissions = (databaseId) => {
  return {
    type: GET_TABLES_PERMISSIONS,
    databaseId,
  };
};

export const updateDatabasesPermissions = (databaseId, groupId, accessType) => {
  return {
    type: UPDATE_DATABASES_PERMISSIONS,
    payload: { databaseId, groupId, accessType },
  };
};

export const updateTablesPermissions = (databaseId, tableId, groupId, accessType) => {
  return {
    type: UPDATE_TABLES_PERMISSIONS,
    payload: { databaseId, tableId, groupId, accessType },
  };
};

export const saveChanges = (updatedPermissions) => {
  return {
    type: SAVE_CHANGES,
    updatedPermissions,
  };
};

export const cancelChanges = () => {
  return {
    type: CANCEL_CHANGES,
  };
};
