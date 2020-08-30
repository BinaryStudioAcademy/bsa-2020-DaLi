import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_USER_FROM_LIST,
  UPDATE_USER_FROM_LIST_SUCCESS,
  UPDATE_USER_FROM_LIST_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  TOGGLE_USER_STATUS,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  GET_MEMBERSHIPS,
  GET_MEMBERSHIPS_SUCCESS,
  GET_MEMBERSHIPS_ERROR,
  CLOSE_MODAL,
} from './actionTypes';
import { FETCH_USER } from '../LoginPageContainer/actionTypes';
import { usersAPIService } from '../../services/api/usersAPI.service';
import { SetIsLoading, setTemporaryPassword } from './actions';
import { userGroupsAPIService } from '../../services/api/userGroupsAPI.service';

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

export function* getUsersMembershipSaga() {
  try {
    const response = yield call(userGroupsAPIService.getAllGroupsWithUsers);
    yield put({ type: GET_MEMBERSHIPS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: GET_MEMBERSHIPS_ERROR, error });
  }
}

export function* watchGetUsersMembershipSaga() {
  yield takeEvery(GET_MEMBERSHIPS, getUsersMembershipSaga);
}

export function* addUserSaga(payload) {
  try {
    const response = yield call(usersAPIService.createUser, payload.user);
    yield put({ type: ADD_USER_SUCCESS });
    yield put({ type: CLOSE_MODAL });
    yield put(setTemporaryPassword(response.password));
    yield put({ type: GET_USERS });
  } catch (error) {
    yield put({ type: ADD_USER_ERROR, payload: error });
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
  }
}

export function* watchDeleteUserSaga() {
  yield takeEvery(DELETE_USER, deleteUserSaga);
}

export function* toggleUserStatus({ payload }) {
  try {
    yield call(usersAPIService.toggleUserStatus, payload.id, payload.data);
    yield put({ type: UPDATE_USER_FROM_LIST_SUCCESS });
    yield put({ type: CLOSE_MODAL });
    yield put({ type: GET_USERS });
  } catch (error) {
    yield put({ type: UPDATE_USER_FROM_LIST_ERROR, payload: error, error });
  }
}

export function* watchToggleUserStatus() {
  yield takeEvery(TOGGLE_USER_STATUS, toggleUserStatus);
}

export function* updateUser({ payload }) {
  try {
    const res = yield call(usersAPIService.updateUser, payload.id, payload.data);
    yield put({ type: UPDATE_USER_FROM_LIST_SUCCESS, payload: res });
    yield put({ type: CLOSE_MODAL });
    yield put({ type: GET_USERS });
    yield put({ type: FETCH_USER });
  } catch (error) {
    yield put({ type: UPDATE_USER_FROM_LIST_ERROR, payload: error });
  }
}

export function* watchUpdateUserData() {
  yield takeEvery(UPDATE_USER_FROM_LIST, updateUser);
}

export function* resetUserPasswordSaga(payload) {
  try {
    const response = yield call(usersAPIService.updateUser, payload.id, { password: null });
    yield put({ type: RESET_PASSWORD_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: RESET_PASSWORD_ERROR, payload: error });
  }
}

export function* watchResetUserPasswordSaga() {
  yield takeEvery(RESET_PASSWORD, resetUserPasswordSaga);
}

export default function* usersSaga() {
  yield all([
    watchGetUsersSaga(),
    watchDeleteUserSaga(),
    watchAddUserSaga(),
    watchUpdateUserData(),
    watchToggleUserStatus(),
    watchResetUserPasswordSaga(),
    watchGetUsersMembershipSaga(),
  ]);
}
