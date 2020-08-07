import { all } from 'redux-saga/effects';
import loginSagas from '../containers/LoginPageContainer/sagas';


export function* rootSaga() {
  yield all([loginSagas()]);
}
