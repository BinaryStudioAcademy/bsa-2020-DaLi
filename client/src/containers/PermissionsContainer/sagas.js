import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  GET_DATABASES_PERMISSIONS,
  GET_DATABASES_PERMISSIONS_SUCCESS,
  GET_DATABASES_PERMISSIONS_ERROR,
  GET_TABLES_PERMISSIONS,
  GET_TABLES_PERMISSIONS_SUCCESS,
  GET_TABLES_PERMISSIONS_ERROR,
  SAVE_CHANGES,
  SAVE_CHANGES_SUCCESS,
  SAVE_CHANGES_ERROR,
} from './actionsTypes';
import { permissionsAPIService } from '../../services/api/permissionsAPI.service';

function* getDatabasesPermissions() {
  try {
    const { permissions } = yield call(permissionsAPIService.getDatabasesPermissions);
    yield put({ type: GET_DATABASES_PERMISSIONS_SUCCESS, payload: { databasesPermissions: permissions } });
  } catch (error) {
    yield put({ type: GET_DATABASES_PERMISSIONS_ERROR, payload: error });
  }
}

export function* watchGetDatabasesPermissions() {
  yield takeEvery(GET_DATABASES_PERMISSIONS, getDatabasesPermissions);
}

function* getTablesPermissions(payload) {
  try {
    const { databaseId } = payload;
    const { permissions } = yield call(permissionsAPIService.getTablesPermissions, databaseId);
    yield put({
      type: GET_TABLES_PERMISSIONS_SUCCESS,
      payload: { databaseId, tables: permissions },
    });
  } catch (error) {
    yield put({ type: GET_TABLES_PERMISSIONS_ERROR, payload: error });
  }
}

export function* watchGetTablesPermissionsSaga() {
  yield takeEvery(GET_TABLES_PERMISSIONS, getTablesPermissions);
}

function* saveChanges(payload) {
  try {
    const { updatedPermissions } = payload;
    yield call(permissionsAPIService.updatePermissions, { permissions: updatedPermissions });
    yield put({ type: SAVE_CHANGES_SUCCESS });
  } catch (error) {
    yield put({ type: SAVE_CHANGES_ERROR, payload: error });
  }
}

export function* watchSaveChanges() {
  yield takeEvery(SAVE_CHANGES, saveChanges);
}

export default function* permissionsSaga() {
  yield all([watchGetDatabasesPermissions(), watchGetTablesPermissionsSaga(), watchSaveChanges()]);
}
