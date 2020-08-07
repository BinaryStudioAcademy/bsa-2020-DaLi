import { all } from 'redux-saga/effects';
import authSaga from '../containers/LoginPageContainer/sagas';

export function* rootSaga() {
  yield all([authSaga()]);
}
