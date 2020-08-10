import { all } from 'redux-saga/effects';
import loginSagas from '../containers/LoginPageContainer/sagas';
import visualizationsSaga from '../containers/VisualizationsListContainer/sagas';

export function* rootSaga() {
  yield all([loginSagas(), visualizationsSaga()]);
}
