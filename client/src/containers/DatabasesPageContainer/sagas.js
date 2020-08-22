import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  DELETE_DATABASE,
  DELETE_DATABASE_SUCCESS,
  DELETE_DATABASE_ERROR,
  GET_DATABASES,
  GET_DATABASES_SUCCESS,
  GET_DATABASES_ERROR,
  ADD_DATABASE,
  ADD_DATABASE_ERROR,
} from './actionTypes';
import { databasesAPIService } from '../../services/api/databasesAPI.service';
import { SetIsLoading } from './actions';

export function* deleteDatabaseSaga(payload) {
  try {
    yield put(SetIsLoading(true));
    yield call(databasesAPIService.deleteDatabase, payload.id);
    yield put({ type: DELETE_DATABASE_SUCCESS });
    yield put({ type: GET_DATABASES });
  } catch (error) {
    yield put({ type: DELETE_DATABASE_ERROR, error });
    yield put(SetIsLoading(false));
  }
}

export function* watchDeleteDatabaseSaga() {
  yield takeEvery(DELETE_DATABASE, deleteDatabaseSaga);
}

export function* getDatabasesSaga() {
  try {
    yield put(SetIsLoading(true));
    const response = yield call(databasesAPIService.getDatabases);
    yield put({ type: GET_DATABASES_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: GET_DATABASES_ERROR, error });
    yield put(SetIsLoading(false));
  }
}

export function* addDatabaseSaga(action) {
  try {
    const { history, data } = action.payload;
    yield call(databasesAPIService.addDatabase, data);
    history.push('/admin/databases');
  } catch (error) {
    yield put({ type: ADD_DATABASE_ERROR, payload: error });
  }
}

export function* watchAddDatabaseSaga() {
  yield takeEvery(ADD_DATABASE, addDatabaseSaga);
}

export function* watchGetDatabasesSaga() {
  yield takeEvery(GET_DATABASES, getDatabasesSaga);
}

export default function* databasesSaga() {
  yield all([watchDeleteDatabaseSaga(), watchGetDatabasesSaga(), watchAddDatabaseSaga()]);
}
