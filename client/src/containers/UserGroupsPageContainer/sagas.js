import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  GET_USER_GROUPS,
  GET_USER_GROUPS_SUCCESS,
  GET_USER_GROUP,
  GET_USER_GROUP_SUCCESS,
  ADD_USER_GROUP,
  UPDATE_USER_GROUP,
  DELETE_USER_GROUP,
  ADD_USER_TO_GROUP,
} from './actionTypes';
import { userGroupsAPIService } from '../../services/api/userGroupsAPI.service';
import { SetIsLoading, setError } from './actions';

export function* getUserGroupsSaga() {
  try {
    yield put(SetIsLoading(true));
    const res = yield call(userGroupsAPIService.getUserGroups);
    yield put({ type: GET_USER_GROUPS_SUCCESS, payload: res });
    yield put(SetIsLoading(false));
  } catch (error) {
    yield put(setError(error));
    yield put(SetIsLoading(false));
  }
}

export function* watchGetUserGroupsSaga() {
  yield takeEvery(GET_USER_GROUPS, getUserGroupsSaga);
}

export function* getUserGroupSaga(payload) {
  try {
    yield put(SetIsLoading(true));
    const res = yield call(userGroupsAPIService.getUserGroup, payload.id);
    yield put({ type: GET_USER_GROUP_SUCCESS, payload: res });
    yield put(SetIsLoading(false));
  } catch (error) {
    yield put(setError(error));
    yield put(SetIsLoading(false));
  }
}

export function* watchGetUserGroupSaga() {
  yield takeEvery(GET_USER_GROUP, getUserGroupSaga);
}

export function* addUserGroupSaga(payload) {
  try {
    yield put(SetIsLoading(true));
    yield call(userGroupsAPIService.createUserGroup, payload.userGroup);
    yield put({ type: GET_USER_GROUPS });
  } catch (error) {
    yield put(setError(error));
    yield put(SetIsLoading(false));
  }
}

export function* watchAddUserGroupSaga() {
  yield takeEvery(ADD_USER_GROUP, addUserGroupSaga);
}

export function* updateUserGroupSaga({ payload }) {
  try {
    yield put(SetIsLoading(true));
    yield call(userGroupsAPIService.updateUserGroup, payload.id, payload.data);
    yield put({ type: GET_USER_GROUPS });
  } catch (error) {
    yield put(setError(error));
    yield put(SetIsLoading(false));
  }
}

export function* watchUpdateUserGroupSaga() {
  yield takeEvery(UPDATE_USER_GROUP, updateUserGroupSaga);
}

export function* deleteUserGroupSaga(payload) {
  try {
    yield put(SetIsLoading(true));
    yield call(userGroupsAPIService.deleteUserGroup, payload.id);
    yield put({ type: GET_USER_GROUPS });
  } catch (error) {
    yield put(setError(error));
    yield put(SetIsLoading(false));
  }
}

export function* watchDeleteUserGroupSaga() {
  yield takeEvery(DELETE_USER_GROUP, deleteUserGroupSaga);
}

export function* addUserToGroupSaga(payload) {
  try {
    yield put(SetIsLoading(true));
    yield call(userGroupsAPIService.addUserToGroup, payload.userGroupsId, payload.usersId);
    yield put({ type: GET_USER_GROUP, id: payload.userGroupsId });
  } catch (error) {
    yield put(setError(error));
    yield put(SetIsLoading(false));
  }
}

export function* watchAddUserToGroupSaga() {
  yield takeEvery(ADD_USER_TO_GROUP, addUserToGroupSaga);
}

export default function* userGroupsSaga() {
  yield all([
    watchGetUserGroupsSaga(),
    watchAddUserGroupSaga(),
    watchUpdateUserGroupSaga(),
    watchDeleteUserGroupSaga(),
    watchGetUserGroupSaga(),
    watchAddUserToGroupSaga(),
  ]);
}
