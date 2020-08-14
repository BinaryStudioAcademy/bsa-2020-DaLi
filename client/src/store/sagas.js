import { all } from 'redux-saga/effects';
import authSaga from '../containers/LoginPageContainer/sagas';
import visualizationsSaga from '../containers/VisualizationsListContainer/sagas';
import usersSaga from '../containers/PeoplePageContainer/sagas';

export function* rootSaga() {
  yield all([authSaga(), visualizationsSaga(), usersSaga()]);
}
