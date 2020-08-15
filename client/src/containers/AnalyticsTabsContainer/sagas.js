import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  GET_ANALYTICS,
  GET_ANALYTICS_SUCCESS,
  GET_ANALYTICS_ERROR,
  DELETE_VISUALIZATION,
  ADD_DASHBOARD,
  DELETE_DASHBOARD,
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

export function* deleteVisualizationSaga(payload) {
  yield call(visualizationsAPIService.deleteVisualization, payload.id);
  yield put({ type: GET_ANALYTICS });
}

export function* watchDeleteVisualizationSaga() {
  yield takeEvery(DELETE_VISUALIZATION, deleteVisualizationSaga);
}

export function* addDashboardSaga(payload) {
  yield call(dashboardsAPIService.createDashboard, payload.newDashboard);
  yield put({ type: GET_ANALYTICS });
}

export function* watchAddDashboardSaga() {
  yield takeEvery(ADD_DASHBOARD, addDashboardSaga);
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
    watchAddDashboardSaga(),
    watchDeleteDashboardSaga(),
  ]);
}
