import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  DELETE_DATABASE,
  DELETE_DATABASE_SUCCESS,
  DELETE_DATABASE_ERROR,
  GET_DATABASES,
  GET_DATABASES_SUCCESS,
  GET_DATABASES_ERROR,
} from './actionTypes';
import { databasesAPIService } from '../../services/api/databasesAPI.service';
import { SetIsLoading } from './actions';

export function* deleteDatabaseSaga(payload) {
  try {
    yield put(SetIsLoading(true));
    yield call(databasesAPIService.deleteDatabase, payload.id);
    yield put({ type: DELETE_DATABASE_SUCCESS });
  } catch (error) {
    yield put({ type: DELETE_DATABASE_ERROR, error });
    yield put(SetIsLoading(false));
  }
}

export function* watchDeleteDatabaseSaga() {
  yield takeEvery(DELETE_DATABASE, deleteDatabaseSaga);
}

export function* getDatabasesSaga(payload) {
  try {
    yield put(SetIsLoading(true));
    yield call(databasesAPIService.getDatabases, payload.id);
    yield put({ type: GET_DATABASES_SUCCESS });
  } catch (error) {
    yield put({ type: GET_DATABASES_ERROR, error });
    yield put(SetIsLoading(false));
  }
}

export function* watchGetDatabasesSaga() {
  yield takeEvery(GET_DATABASES, getDatabasesSaga);
}

export default function* databasesSaga() {
  yield all([watchDeleteDatabaseSaga(), watchGetDatabasesSaga()]);
}
