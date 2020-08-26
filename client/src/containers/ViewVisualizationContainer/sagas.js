import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  FETCH_VISUALIZATION,
  FETCH_VISUALIZATION_SUCCESS,
  CREATE_VISUALIZATION,
  CREATE_VISUALIZATION_ERROR,
} from './actionTypes';
import { visualizationsAPIService } from '../../services/api/visualizationsAPI.service';

export function* fetchVisualizationSaga(action) {
  const visualization = yield call(visualizationsAPIService.getVisualization, action.id);
  yield put({ type: FETCH_VISUALIZATION_SUCCESS, payload: { visualization } });
}

export function* watchFetchVisualizationSaga() {
  yield takeEvery(FETCH_VISUALIZATION, fetchVisualizationSaga);
}

function* createVisualization({ payload }) {
  try {
    const { newVisualization, history } = payload;
    yield call(visualizationsAPIService.createVisualization, newVisualization);
    history.push('/');
  } catch (error) {
    yield put({ type: CREATE_VISUALIZATION_ERROR, payload: { error } });
  }
}

export function* watchCreateVisualization() {
  yield takeEvery(CREATE_VISUALIZATION, createVisualization);
}

export default function* currentVisualizationSaga() {
  yield all([watchFetchVisualizationSaga(), watchCreateVisualization()]);
}
