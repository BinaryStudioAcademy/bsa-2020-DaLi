import {
  GET_DATABASES_PERMISSIONS,
  GET_TABLES_PERMISSIONS,
  UPDATE_DATABASES_PERMISSIONS,
  UPDATE_TABLES_PERMISSIONS,
  SAVE_CHANGES,
  CANCEL_CHANGES,
  RESET_PERMISSIONS_STATE,
  GET_COLLECTIONS_PERMISSIONS,
  UPDATE_COLLECTIONS_PERMISSIONS,
  SAVE_COLLECTIONS_CHANGES,
} from './actionsTypes';

export const getDatabasesPermissions = () => {
  return {
    type: GET_DATABASES_PERMISSIONS,
  };
};

export const getCollectionsPermissions = () => {
  return {
    type: GET_COLLECTIONS_PERMISSIONS,
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

export const updateCollectionsPermissions = (collectionId, groupId, accessType) => {
  return {
    type: UPDATE_COLLECTIONS_PERMISSIONS,
    payload: { collectionId, groupId, accessType },
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
export const saveCollectionChanges = (updatedPermissions) => {
  return {
    type: SAVE_COLLECTIONS_CHANGES,
    updatedPermissions,
  };
};

export const cancelChanges = () => {
  return {
    type: CANCEL_CHANGES,
  };
};

export const resetState = () => {
  return {
    type: RESET_PERMISSIONS_STATE,
  };
};
