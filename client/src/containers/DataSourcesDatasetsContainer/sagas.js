import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  GET_DATASETS,
  GET_DATASETS_SUCCESS,
  GET_DATASETS_ERROR,
  GET_TABLES,
  GET_TABLES_ERROR,
  GET_TABLES_SUCCESS,
  GET_DATASET_NAME,
  SET_CURRENT_DB_NAME,
  SYNC_DB_TABLES,
  SYNC_DB_TABLES_ERROR,
  SYNC_DB_TABLES_SUCCESS,
} from './actionTypes';
import { databasesAPIService } from '../../services/api/databasesAPI.service';
import { setIsLoading } from './actions';

export function* getDatasetsSaga() {
  try {
    yield put(setIsLoading(true));
    const datasets = yield call(databasesAPIService.getDatabases);
    yield put({ type: GET_DATASETS_SUCCESS, payload: datasets });
  } catch (error) {
    yield put({ type: GET_DATASETS_ERROR, error });
    yield put(setIsLoading(false));
  }
}

export function* watchGetDatasetsSaga() {
  yield takeEvery(GET_DATASETS, getDatasetsSaga);
}

export function* getTablesSaga(payload) {
  try {
    yield put(setIsLoading(true));
    const response = yield call(databasesAPIService.getTables, payload.id);
    yield put({ type: GET_TABLES_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: GET_TABLES_ERROR, error });
    yield put(setIsLoading(false));
  }
}

export function* watchGetTablesSaga() {
  yield takeEvery(GET_TABLES, getTablesSaga);
}

export function* getDatabaseNameById(payload) {
  try {
    yield put(setIsLoading(true));
    const response = yield call(databasesAPIService.getDatabase, payload.id);
    yield put({ type: SET_CURRENT_DB_NAME, payload: response.dbNickname });
  } catch (error) {
    yield put({ type: GET_DATASETS_ERROR, error });
    yield put(setIsLoading(false));
  }
}

export function* watchGetDatabaseNameById() {
  yield takeEvery(GET_DATASET_NAME, getDatabaseNameById);
}

export function* syncDatabaseTables(payload) {
  try {
    yield put(setIsLoading(true));
    const tables = yield call(databasesAPIService.syncDatabaseTables, payload.id);
    yield put({ type: SYNC_DB_TABLES_SUCCESS, payload: tables });
    yield put({ type: GET_TABLES, id: payload.id });
  } catch (error) {
    yield put({ type: SYNC_DB_TABLES_ERROR, error });
    yield put(setIsLoading(false));
  }
}

export function* watchSyncDatabaseTables() {
  yield takeEvery(SYNC_DB_TABLES, syncDatabaseTables);
}

export default function* datasetsSaga() {
  yield all([watchGetDatasetsSaga(), watchGetTablesSaga(), watchGetDatabaseNameById(), watchSyncDatabaseTables()]);
}
