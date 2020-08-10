import { put, call, takeEvery, all } from 'redux-saga/effects';
import { loginService, getCurrentUserService } from '../../services/loginService';
import { getToken, setToken } from '../../helpers/jwtToken';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  LOGIN_USER,
} from './actionTypes';

export function* loginSaga(payload) {
  try {
    const token = getToken();
    let response;
    if (token) {
      response = yield call(getCurrentUserService);
    } else {
      response = yield call(loginService, payload.request);
      setToken(response.token);
    }
    yield put({ type: LOGIN_USER_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: LOGIN_USER_ERROR, error });
  }
}

export function* watchLoginSaga() {
  yield takeEvery(LOGIN_USER, loginSaga);
}

export function* logoutSaga() {
  try {
    yield put({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    yield put({ type: LOGOUT_USER_ERROR, error });
  }
}

export function* watchLogoutSaga() {
  yield takeEvery(LOGOUT_USER, logoutSaga);
}

export default function* authSaga() {
  yield all([watchLoginSaga(), watchLogoutSaga()]);
}
