import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  GET_DASHBOARD,
  GET_DASHBOARD_ERROR,
  GET_DASHBOARD_SUCCESS,
  ADD_VISUALIZATIONS_TO_DASHBOARD,
  ADD_VISUALIZATIONS_TO_DASHBOARD_SUCCESS,
  ADD_VISUALIZATIONS_TO_DASHBOARD_ERROR,
} from './actionsTypes';
import { dashboardsAPIService } from '../../services/api/dashboardsAPI.service';

export function* getDashboard(payload) {
  try {
    const dashboard = yield call(dashboardsAPIService.getDashboard, payload.id);
    yield put({ type: GET_DASHBOARD_SUCCESS, payload: { dashboard } });
  } catch (error) {
    yield put({ type: GET_DASHBOARD_ERROR, payload: error });
  }
}

export function* watchGetDashboardSaga() {
  yield takeEvery(GET_DASHBOARD, getDashboard);
}

export function* addVisualizationsToDashboard({ dashboardId, visualizations, updatedDashboard }) {
  try {
    yield all(
      visualizations.map((visualization) =>
        call(dashboardsAPIService.addVisualizationsToDashboard, dashboardId, visualization)
      )
    );
    yield call(dashboardsAPIService.updateDashboard, dashboardId, updatedDashboard);
    const dashboard = yield call(dashboardsAPIService.getDashboard, dashboardId);
    yield put({ type: ADD_VISUALIZATIONS_TO_DASHBOARD_SUCCESS, payload: { dashboard } });
  } catch (error) {
    yield put({ type: ADD_VISUALIZATIONS_TO_DASHBOARD_ERROR, payload: error });
  }
}

export function* watchAddVisualizationsToDashboardSaga() {
  yield takeEvery(ADD_VISUALIZATIONS_TO_DASHBOARD, addVisualizationsToDashboard);
}

export default function* currentDashboardSaga() {
  yield all([watchGetDashboardSaga(), watchAddVisualizationsToDashboardSaga()]);
}
