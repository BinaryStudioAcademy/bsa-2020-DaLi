import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA,
  FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA_SUCCESS,
  SET_VISUALIZATION,
  SET_VISUALIZATION_IN_PROGRESS,
  SET_VISUALIZATION_SUCCESS,
  VISUALIZATIONS_WITH_DATA_FETCHING,
  FETCH_DATA_AND_SCHEMA,
  FETCH_DATA_AND_SCHEMA_IN_PROGRESS,
  FETCH_DATA_AND_SCHEMA_SUCCESS,
  UPDATE_VISUALIZATION,
} from './actionTypes';
import { visualizationsAPIService } from '../../services/api/visualizationsAPI.service';
import { dbTableAPIService } from '../../services/api/dbTableAPI.service';

export function* fetchVisualizationWithDataAndSchemaSaga({ id }) {
  yield put({ type: FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA_START });
  const visualization = yield call(visualizationsAPIService.getVisualization, id);
  const datasetSettings = visualization.datasetSettings || [];
  const data = yield call(dbTableAPIService.getTableData, visualization.tableId, {
    settings: datasetSettings,
    config: visualization.config,
  });
  const schema = yield call(dbTableAPIService.getTableSchema, visualization.tableId);
  yield put({
    type: FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA_SUCCESS,
    payload: { visualization: { ...visualization, data: visualizationData } },
  });
}

export function* watchFetchVisualizationWithDataAndSchemaSaga() {
  yield takeEvery(FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA, fetchVisualizationWithDataSaga);
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

export function* fetchDataAndSchemaSaga({ tableId, settings }) {
  yield put({ type: FETCH_DATA_AND_SCHEMA_IN_PROGRESS });
  const visualizationData = yield call(dbTableAPIService.getTableData, tableId, { settings });
  const schema = yield call(dbTableAPIService.getTableSchema, tableId);
  yield put({
    type: FETCH_DATA_AND_SCHEMA_SUCCESS,
    payload: { visualization: { data: visualizationData, schema } },
  });
}

export function* watchFetchDataAndSchemaSaga() {
  yield takeEvery(FETCH_DATA_AND_SCHEMA, fetchDataAndSchemaSaga);
}

export function* updateVisualizationSaga({ visualizationId, updatedVisualization }) {
  yield call(visualizationsAPIService.updateVisualization, visualizationId, updatedVisualization);
  yield put({ type: FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA, id: visualizationId });
}

export function* watchUpdateVisualizationSaga() {
  yield takeEvery(UPDATE_VISUALIZATION, updateVisualizationSaga);
}

export default function* currentVisualizationSaga() {
  yield all([
    watchFetchVisualizationWithDataAndSchemaSaga(),
    watchSetVisualizationSaga(),
    watchFetchDataAndSchemaSaga(),
    watchUpdateVisualizationSaga(),
  ]);
}
