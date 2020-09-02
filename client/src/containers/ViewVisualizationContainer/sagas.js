import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  FETCH_VISUALIZATION,
  FETCH_VISUALIZATION_SUCCESS,
  SET_VISUALIZATION,
  SET_VISUALIZATION_IN_PROGRESS,
  SET_VISUALIZATION_SUCCESS,
  VISUALIZATIONS_FETCHING,
  FETCH_DATA_AND_SCHEMA,
  FETCH_DATA_AND_SCHEMA_IN_PROGRESS,
  FETCH_DATA_AND_SCHEMA_SUCCESS,
} from './actionTypes';
import { visualizationsAPIService } from '../../services/api/visualizationsAPI.service';
import { dbTableAPIService } from '../../services/api/dbTableAPI.service';

export function* fetchVisualizationSaga(action) {
  yield put({ type: VISUALIZATIONS_FETCHING });
  const visualization = yield call(visualizationsAPIService.getVisualization, action.id);
  const visualizationData = yield call(dbTableAPIService.getTable, visualization.tableId);
  yield put({
    type: FETCH_VISUALIZATION_SUCCESS,
    payload: { visualization: { ...visualization, data: visualizationData } },
  });
}

export function* watchFetchVisualizationSaga() {
  yield takeEvery(FETCH_VISUALIZATION, fetchVisualizationSaga);
}

export function* setVisualizationSaga({ payload }) {
  yield put({ type: SET_VISUALIZATION_IN_PROGRESS });
  const { visualization } = payload;
  yield put({
    type: SET_VISUALIZATION_SUCCESS,
    payload: { visualization: { ...visualization } },
  });
}

export function* watchSetVisualizationSaga() {
  yield takeEvery(SET_VISUALIZATION, setVisualizationSaga);
}

export function* fetchDataAndSchemaSaga({ tableId }) {
  yield put({ type: FETCH_DATA_AND_SCHEMA_IN_PROGRESS });
  const visualizationData = yield call(dbTableAPIService.getTable, tableId);
  const schema = yield call(dbTableAPIService.getTableSchema, tableId);
  yield put({
    type: FETCH_DATA_AND_SCHEMA_SUCCESS,
    payload: { visualization: { data: visualizationData, schema } },
  });
}

export function* watchFetchDataAndSchemaSaga() {
  yield takeEvery(FETCH_DATA_AND_SCHEMA, fetchDataAndSchemaSaga);
}

export default function* currentVisualizationSaga() {
  yield all([watchFetchVisualizationSaga(), watchSetVisualizationSaga(), watchFetchDataAndSchemaSaga()]);
}
