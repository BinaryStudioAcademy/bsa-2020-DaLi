import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  GET_VISUALISATIONS,
  GET_VISUALISATIONS_SUCCESS,
  GET_VISUALISATIONS_ERROR,
  DELETE_VISUALISATIONS,
  DELETE_VISUALISATIONS_SUCCESS,
  DELETE_VISUALISATIONS_ERROR,
} from './actionsTypes';
import { visualizationsAPIService } from '../../services/api/visualizationsAPI.service';
import { SetIsLoading } from './actions';

export function* getVisualisationsSaga() {
  try {
    yield put(SetIsLoading(true));
    const res = yield call(visualizationsAPIService.getVisualizations);
    yield put({ type: GET_VISUALISATIONS_SUCCESS, payload: res });
    yield put(SetIsLoading(false));
  } catch (error) {
    yield put({ type: GET_VISUALISATIONS_ERROR, error });
    yield put(SetIsLoading(false));
  }
}

export function* watchGetVisualizationsSaga() {
  yield takeEvery(GET_VISUALISATIONS, getVisualisationsSaga);
}

export function* deleteVisualisationSaga(payload) {
  try {
    yield put(SetIsLoading(true));
    const res = yield call(visualizationsAPIService.deleteVisualization, payload);
    yield put({ type: DELETE_VISUALISATIONS_SUCCESS, payload: res });
    yield put(SetIsLoading(false));
  } catch (error) {
    yield put({ type: DELETE_VISUALISATIONS_ERROR, error });
    yield put(SetIsLoading(false));
  }
}

export function* watchDeleteVisualizationSaga() {
  yield takeEvery(DELETE_VISUALISATIONS, deleteVisualisationSaga);
}

export default function* visualizationsSaga() {
  yield all([watchGetVisualizationsSaga(), watchDeleteVisualizationSaga()]);
}
