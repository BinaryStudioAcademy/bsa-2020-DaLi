import { put, call, takeEvery, all } from 'redux-saga/effects';
import { authAPIService } from '../../services/api/AuthAPI.service';
import { userAPIService } from '../../services/api/userAPI.service';
import { setToken, removeToken } from '../../helpers/jwtToken';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  LOGIN_USER,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_CURRENT_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER,
  FETCH_USER_ERROR,
  REGISTER_ADMIN,
  REGISTER_ADMIN_ERROR,
} from './actionTypes';

export function* loginSaga(payload) {
  try {
    const response = yield call(authAPIService.loginUser, payload.request);
    setToken(response.token, payload.request.rememberMe);
    yield put({ type: LOGIN_USER_SUCCESS, payload: response });
  } catch (error) {
    removeToken();
    yield put({ type: LOGIN_USER_ERROR, payload: error });
  }
}

export function* watchLoginSaga() {
  yield takeEvery(LOGIN_USER, loginSaga);
}

export function* fetchUserSaga() {
  try {
    const response = yield call(authAPIService.getCurrentUser);
    yield put({ type: FETCH_USER_SUCCESS, payload: response });
  } catch (error) {
    removeToken();
    yield put({ type: FETCH_USER_ERROR, payload: error });
  }
}

export function* watchFetchUserSaga() {
  yield takeEvery(FETCH_USER, fetchUserSaga);
}

export function* logoutSaga() {
  try {
    yield put({ type: LOGOUT_USER_SUCCESS });
    removeToken();
  } catch (error) {
    yield put({ type: LOGOUT_USER_ERROR, error });
  }
}

export function* watchLogoutSaga() {
  yield takeEvery(LOGOUT_USER, logoutSaga);
}

export function* updateUser({ payload }) {
  try {
    const res = yield call(userAPIService.updateUserData, payload.id, payload.data);
    yield put({ type: UPDATE_USER_SUCCESS, payload: res });
    yield put({ type: UPDATE_CURRENT_USER, payload: res });
  } catch (error) {
    yield put({ type: UPDATE_USER_ERROR, payload: error });
  }
}

export function* watchUpdateUserData() {
  yield takeEvery(UPDATE_USER, updateUser);
}

export function* registerAdmin({ payload }) {
  try {
    const { email, password } = payload;
    yield call(authAPIService.registerUser, payload);
    const loginResponse = yield call(authAPIService.loginUser, { email, password });
    setToken(loginResponse.token);
    yield put({ type: LOGIN_USER_SUCCESS, payload: loginResponse });
  } catch (error) {
    yield put({ type: REGISTER_ADMIN_ERROR, payload: error });
  }
}

export function* watchRegisterAdmin() {
  yield takeEvery(REGISTER_ADMIN, registerAdmin);
}

export default function* authSaga() {
  yield all([watchLoginSaga(), watchLogoutSaga(), watchUpdateUserData(), watchFetchUserSaga(), watchRegisterAdmin()]);
}
