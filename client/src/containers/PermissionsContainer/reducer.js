import {
  GET_DATABASES_PERMISSIONS,
  GET_DATABASES_PERMISSIONS_SUCCESS,
  GET_DATABASES_PERMISSIONS_ERROR,
  GET_TABLES_PERMISSIONS,
  GET_TABLES_PERMISSIONS_SUCCESS,
  GET_TABLES_PERMISSIONS_ERROR,
  UPDATE_DATABASES_PERMISSIONS,
  UPDATE_TABLES_PERMISSIONS,
  CANCEL_CHANGES,
  SAVE_CHANGES,
  SAVE_CHANGES_SUCCESS,
  SAVE_CHANGES_ERROR,
  RESET_PERMISSIONS_STATE,
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
  error: null,
  isLoading: true,
};

const permissionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DATABASES_PERMISSIONS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_DATABASES_PERMISSIONS_SUCCESS: {
      const { databasesPermissions } = payload;
      return {
        ...state,
        isLoading: false,
        initDatabasesPermissions: databasesPermissions,
        currentDatabasesPermissions: databasesPermissions,
      };
    }

    case GET_DATABASES_PERMISSIONS_ERROR: {
      const { error } = payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case GET_TABLES_PERMISSIONS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case GET_TABLES_PERMISSIONS_SUCCESS: {
      const { databaseId, tables } = payload;
      return {
        ...state,
        isLoading: false,
        initTablesPermissions: state.initTablesPermissions.concat({ databaseId, tables }),
        currentTablesPermissions: state.currentTablesPermissions.concat({ databaseId, tables }),
      };
    }

    case GET_TABLES_PERMISSIONS_ERROR: {
      const { error } = payload;
      return {
        ...state,
        isLoading: false,
        error,
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

    case SAVE_CHANGES: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SAVE_CHANGES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        changes: [],
      };
    }

    case SAVE_CHANGES_ERROR: {
      const { error } = payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case RESET_PERMISSIONS_STATE: {
      return initialState;
    }

    default:
      return state;
  }
};

export default permissionsReducer;
