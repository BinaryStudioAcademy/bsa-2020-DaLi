import { put, call, takeEvery, all, delay } from 'redux-saga/effects';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  TOGGLE_USER_STATUS,
  TOGGLE_USER_STATUS_SUCCESS,
  TOGGLE_USER_STATUS_ERROR,
} from './actionTypes';
import { usersAPIService } from '../../services/api/usersAPI.service';
import { SetIsLoading } from './actions';

export function* getUsersSaga() {
  try {
    yield put(SetIsLoading(true));
    const res = yield call(usersAPIService.getUsers);
    // debugger;
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

export function* toggleUserStatus({ payload }) {
  try {
    yield put(SetIsLoading(true));
    yield call(usersAPIService.toggleUserStatus, payload.id, payload.data);
    // yield delay(1000);
    // debugger;
    yield put({ type: UPDATE_USER_SUCCESS });
    yield put({ type: GET_USERS });
  } catch (error) {
    yield put({ type: UPDATE_USER_ERROR, payload: error, error });
    yield put(SetIsLoading(false));
  }
}

export function* watchToggleUserStatus() {
  yield takeEvery(TOGGLE_USER_STATUS, toggleUserStatus);
}

export function* updateUser({ payload }) {
  try {
    const res = yield call(usersAPIService.updateUser, payload.id, payload.data);
    yield put({ type: UPDATE_USER_SUCCESS, payload: res });
    yield put({ type: GET_USERS });
  } catch (error) {
    yield put({ type: UPDATE_USER_ERROR, payload: error });
  }
}

export function* watchUpdateUserData() {
  yield takeEvery(UPDATE_USER, updateUser);
}

export default function* usersSaga() {
  yield all([
    watchGetUsersSaga(),
    watchDeleteUserSaga(),
    watchAddUserSaga(),
    watchUpdateUserData(),
    watchToggleUserStatus(),
  ]);
}
