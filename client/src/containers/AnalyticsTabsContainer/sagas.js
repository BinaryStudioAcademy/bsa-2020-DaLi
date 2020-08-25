import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  GET_ANALYTICS,
  GET_ANALYTICS_SUCCESS,
  GET_ANALYTICS_ERROR,
  DELETE_VISUALIZATION,
  DELETE_DASHBOARD,
  FETCH_VISUALIZATIONS,
  FETCH_VISUALIZATIONS_SUCCESS,
  FETCH_VISUALIZATIONS_ERROR,
} from './actionsTypes';
import { visualizationsAPIService } from '../../services/api/visualizationsAPI.service';
import { dashboardsAPIService } from '../../services/api/dashboardsAPI.service';

export function* getAnalytics() {
  try {
    const visualizations = yield call(visualizationsAPIService.getVisualizations);
    const dashboards = yield call(dashboardsAPIService.getDashboards);
    yield put({ type: GET_ANALYTICS_SUCCESS, payload: { visualizations, dashboards } });
  } catch (error) {
    yield put({ type: GET_ANALYTICS_ERROR, payload: error });
  }
}

export function* watchGetAnalyticsSaga() {
  yield takeEvery(GET_ANALYTICS, getAnalytics);
}

export function* fetchVisualizationsSaga() {
  try {
    const visualizations = yield call(visualizationsAPIService.getVisualizations);
    yield put({ type: FETCH_VISUALIZATIONS_SUCCESS, payload: { visualizations } });
  } catch (error) {
    yield put({ type: FETCH_VISUALIZATIONS_ERROR, payload: error });
  }
}

export function* watchFetchVisualizationsSaga() {
  yield takeEvery(FETCH_VISUALIZATIONS, fetchVisualizationsSaga);
}

export function* deleteVisualizationSaga(payload) {
  yield call(visualizationsAPIService.deleteVisualization, payload.id);
  yield put({ type: GET_ANALYTICS });
}

export function* watchDeleteVisualizationSaga() {
  yield takeEvery(DELETE_VISUALIZATION, deleteVisualizationSaga);
}

export function* deleteDashboardSaga(payload) {
  yield call(dashboardsAPIService.deleteDashboard, payload.id);
  yield put({ type: GET_ANALYTICS });
}

export function* watchDeleteDashboardSaga() {
  yield takeEvery(DELETE_DASHBOARD, deleteDashboardSaga);
}

export default function* analyticsSaga() {
  yield all([
    watchGetAnalyticsSaga(),
    watchDeleteVisualizationSaga(),
    watchDeleteDashboardSaga(),
    watchFetchVisualizationsSaga(),
  ]);
}
