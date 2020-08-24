import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  GET_DASHBOARD,
  GET_DASHBOARD_ERROR,
  GET_DASHBOARD_SUCCESS,
  UPDATE_DASHBOARD,
  UPDATE_DASHBOARD_SUCCESS,
  UPDATE_DASHBOARD_ERROR,
} from './actionsTypes';
import { dashboardsAPIService } from '../../services/api/dashboardsAPI.service';
import { dbTableAPIService } from '../../services/api/dbTableAPI.service';

export function* getDashboard(payload) {
  try {
    const dashboard = yield call(dashboardsAPIService.getDashboard, payload.id);
    const arrayOfDataForVisualizations = yield all(
      dashboard.Visualizations.map((visualization) => call(dbTableAPIService.getTable, visualization.tableId))
    );
    arrayOfDataForVisualizations.forEach((data, index) => {
      dashboard.Visualizations[index].data = data;
    });
    yield put({ type: GET_DASHBOARD_SUCCESS, payload: { dashboard } });
  } catch (error) {
    yield put({ type: GET_DASHBOARD_ERROR, payload: error });
  }
}

export function* watchGetDashboardSaga() {
  yield takeEvery(GET_DASHBOARD, getDashboard);
}

export function* updateDashboard({
  dashboardId,
  newVisualizationsId,
  deletedDashboardVisualizationsId,
  updatedDashboard,
}) {
  try {
    yield all(
      deletedDashboardVisualizationsId.map((dashboardVisualizationId) =>
        call(dashboardsAPIService.deleteVisualizationFromDashboard, dashboardId, dashboardVisualizationId)
      )
    );
    yield all(
      newVisualizationsId.map((visualizationId) =>
        call(dashboardsAPIService.addVisualizationToDashboard, dashboardId, visualizationId)
      )
    );
    yield call(dashboardsAPIService.updateDashboard, dashboardId, updatedDashboard);
    const dashboard = yield call(dashboardsAPIService.getDashboard, dashboardId);
    const arrayOfDataForVisualizations = yield all(
      dashboard.Visualizations.map((visualization) => call(dbTableAPIService.getTable, visualization.tableId))
    );
    arrayOfDataForVisualizations.forEach((data, index) => {
      dashboard.Visualizations[index].data = data;
    });
    yield put({ type: UPDATE_DASHBOARD_SUCCESS, payload: { dashboard } });
  } catch (error) {
    yield put({ type: UPDATE_DASHBOARD_ERROR, payload: error });
  }
}

export function* watchUpdateDashboardSaga() {
  yield takeEvery(UPDATE_DASHBOARD, updateDashboard);
}

export default function* currentDashboardSaga() {
  yield all([watchGetDashboardSaga(), watchUpdateDashboardSaga()]);
}
