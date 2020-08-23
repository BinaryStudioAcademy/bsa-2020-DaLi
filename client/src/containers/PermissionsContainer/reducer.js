import {
  GET_DATABASES_PERMISSIONS,
  GET_TABLES_PERMISSIONS,
  UPDATE_DATABASES_PERMISSIONS,
  UPDATE_TABLES_PERMISSIONS,
  CANCEL_CHANGES,
} from './actionsTypes';

import {
  updateDatabasesPermissionsState,
  updateTablesPermissionsState,
  updateDatabasesPermissionsChangesState,
  updateTablesPermissionsChangesState,
} from './helpers';

const initialState = {
  initDatabasesPermissions: [],
  currentDatabasesPermissions: [],
  initTablesPermissions: [],
  currentTablesPermissions: [],
  changes: [],
};

const permissionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DATABASES_PERMISSIONS: {
      const { databasesPermissions } = payload;
      return {
        ...state,
        initDatabasesPermissions: databasesPermissions,
        currentDatabasesPermissions: databasesPermissions,
      };
    }

    case GET_TABLES_PERMISSIONS: {
      const { databaseId, tables } = payload;
      return {
        ...state,
        initTablesPermissions: state.initTablesPermissions.concat({ databaseId, tables }),
        currentTablesPermissions: state.currentTablesPermissions.concat({ databaseId, tables }),
      };
    }

    case UPDATE_DATABASES_PERMISSIONS: {
      const { databaseId, groupId, accessType } = payload;
      const [currentDatabasesPermissions, currentTablesPermissions] = updateDatabasesPermissionsState(
        state.currentDatabasesPermissions,
        state.currentTablesPermissions,
        databaseId,
        groupId,
        accessType
      );
      const changes = updateDatabasesPermissionsChangesState(
        state.initDatabasesPermissions,
        state.changes,
        databaseId,
        groupId,
        accessType
      );
      return {
        ...state,
        currentDatabasesPermissions,
        currentTablesPermissions,
        changes,
      };
    }

    case UPDATE_TABLES_PERMISSIONS: {
      const { databaseId, tableId, groupId, accessType } = payload;
      const [currentDatabasesPermissions, currentTablesPermissions] = updateTablesPermissionsState(
        state.currentTablesPermissions,
        state.currentDatabasesPermissions,
        databaseId,
        tableId,
        groupId,
        accessType
      );
      const changes = updateTablesPermissionsChangesState(
        state.initDatabasesPermissions,
        state.currentTablesPermissions,
        state.changes,
        databaseId,
        tableId,
        groupId,
        accessType
      );
      return {
        ...state,
        currentDatabasesPermissions,
        currentTablesPermissions,
        changes,
      };
    }

    case CANCEL_CHANGES: {
      return {
        ...state,
        currentDatabasesPermissions: state.initDatabasesPermissions,
        currentTablesPermissions: state.initTablesPermissions,
        changes: [],
      };
    }

    default:
      return state;
  }
};

export default permissionsReducer;
