import { put, call, takeEvery, all } from 'redux-saga/effects';
import { loginService } from '../../services/loginService';
import * as types from './actionTypes';

export function* loginSaga(payload) {
  try {
    const response = yield call(loginService, payload);
    yield put({ type: types.LOGIN_USER_SUCCESS, response })
    
  } catch(error) {
    yield put({ type: types.LOGIN_USER_ERROR, error })
  }
}

function* watchloginSaga() {
	yield takeEvery(types.LOGIN_USER, loginSaga)
}

export default function* loginSagas() {
  yield all ([
    watchloginSaga()
  ]);
}