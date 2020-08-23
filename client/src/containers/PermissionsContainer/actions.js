import {
  GET_DATABASES_PERMISSIONS,
  GET_TABLES_PERMISSIONS,
  UPDATE_DATABASES_PERMISSIONS,
  UPDATE_TABLES_PERMISSIONS,
  SAVE_CHANGES,
  CANCEL_CHANGES,
} from './actionsTypes';

export const getDatabasesPermissions = (databasesPermissions) => {
  return {
    type: GET_DATABASES_PERMISSIONS,
    payload: { databasesPermissions },
  };
};

export const getTablesPermissions = (databaseId, tables) => {
  return {
    type: GET_TABLES_PERMISSIONS,
    payload: { databaseId, tables },
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

export const saveChanges = () => {
  return {
    type: SAVE_CHANGES,
  };
};

export const cancelChanges = () => {
  return {
    type: CANCEL_CHANGES,
  };
};
