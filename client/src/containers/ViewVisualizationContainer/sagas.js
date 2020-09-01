import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA,
  FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA_SUCCESS,
  SET_VISUALIZATION,
  SET_VISUALIZATION_IN_PROGRESS,
  SET_VISUALIZATION_SUCCESS,
  FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA_START,
  FETCH_DATA_AND_SCHEMA,
  FETCH_DATA_AND_SCHEMA_IN_PROGRESS,
  FETCH_DATA_AND_SCHEMA_SUCCESS,
} from './actionTypes';
import { visualizationsAPIService } from '../../services/api/visualizationsAPI.service';
import { dbTableAPIService } from '../../services/api/dbTableAPI.service';

export function* fetchVisualizationWithDataAndSchemaSaga({ id }) {
  yield put({ type: FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA_START });
  const visualization = yield call(visualizationsAPIService.getVisualization, id);
  const datasetSettings = visualization.datasetSettings || [];
  const data = yield call(dbTableAPIService.getTableData, visualization.tableId, { settings: datasetSettings });
  const schema = yield call(dbTableAPIService.getTableSchema, visualization.tableId);
  yield put({
    type: FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA_SUCCESS,
    payload: { visualization: { ...visualization, data, schema } },
  });
}

export function* watchFetchVisualizationWithDataAndSchemaSaga() {
  yield takeEvery(FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA, fetchVisualizationWithDataAndSchemaSaga);
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
  const data = yield call(dbTableAPIService.getTableData, tableId, { settings });
  const schema = yield call(dbTableAPIService.getTableSchema, tableId);
  yield put({
    type: FETCH_DATA_AND_SCHEMA_SUCCESS,
    payload: { visualization: { data, schema } },
  });
}

export function* watchFetchDataAndSchemaSaga() {
  yield takeEvery(FETCH_DATA_AND_SCHEMA, fetchDataAndSchemaSaga);
}

export default function* currentVisualizationSaga() {
  yield all([
    watchFetchVisualizationWithDataAndSchemaSaga(),
    watchSetVisualizationSaga(),
    watchFetchDataAndSchemaSaga(),
  ]);
}
