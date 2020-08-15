import { all } from 'redux-saga/effects';
import authSaga from '../containers/LoginPageContainer/sagas';
import analyticsSaga from '../containers/AnalyticsTabsContainer/sagas';

export function* rootSaga() {
  yield all([authSaga(), analyticsSaga()]);
}
