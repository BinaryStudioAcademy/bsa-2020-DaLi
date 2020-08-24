import { all, put, call, takeEvery } from 'redux-saga/effects';
import { FETCH_VISUALIZATION, FETCH_VISUALIZATION_SUCCESS } from './actionTypes';
import { visualizationsAPIService } from '../../services/api/visualizationsAPI.service';

export function* fetchVisualizationSaga(action) {
  const visualization = yield call(visualizationsAPIService.getVisualization, action.id);
  yield put({ type: FETCH_VISUALIZATION_SUCCESS, payload: { visualization } });
}

export function* watchFetchVisualizationSaga() {
  yield takeEvery(FETCH_VISUALIZATION, fetchVisualizationSaga);
}

export default function* currentVisualizationSaga() {
  yield all([watchFetchVisualizationSaga()]);
}
