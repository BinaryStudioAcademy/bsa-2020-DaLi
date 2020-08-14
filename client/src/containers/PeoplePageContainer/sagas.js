import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from './actionTypes';
import { usersAPIService } from '../../services/api/usersAPI.service';
import { SetIsLoading } from './actions';

export function* getUsersSaga() {
  try {
    yield put(SetIsLoading(true));
    const res = yield call(usersAPIService.getUsers);
    yield put({ type: GET_USERS_SUCCESS, payload: res });
    yield put(SetIsLoading(false));
  } catch (error) {
    yield put({ type: GET_USERS_ERROR, error });
    yield put(SetIsLoading(false));
  }
}

export function* watchGetUsersSaga() {
  yield takeEvery(GET_USERS, getUsersSaga);
}

export function* addUserSaga(payload) {
  try {
    yield put(SetIsLoading(true));
    yield call(usersAPIService.createUser, payload.user);
    yield put({ type: ADD_USER_SUCCESS });
    yield put({ type: GET_USERS });
  } catch (error) {
    yield put({ type: ADD_USER_ERROR, error });
    yield put(SetIsLoading(false));
  }
}

export function* watchAddUserSaga() {
  yield takeEvery(ADD_USER, addUserSaga);
}

export function* deleteUserSaga(payload) {
  try {
    yield put(SetIsLoading(true));
    yield call(usersAPIService.deleteUser, payload.id);
    yield put({ type: DELETE_USER_SUCCESS });
    yield put({ type: GET_USERS });
  } catch (error) {
    yield put({ type: DELETE_USER_ERROR, error });
    yield put(SetIsLoading(false));
  }
}

export function* watchDeleteUserSaga() {
  yield takeEvery(DELETE_USER, deleteUserSaga);
}

export default function* usersSaga() {
  yield all([watchGetUsersSaga(), watchDeleteUserSaga(), watchAddUserSaga()]);
}
