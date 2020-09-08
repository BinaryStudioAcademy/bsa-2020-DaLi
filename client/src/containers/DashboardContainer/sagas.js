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
      dashboard.Visualizations.map((visualization) => {
        const datasetSettings = visualization.datasetSettings || [];
        return call(dbTableAPIService.getTableData, visualization.tableId, {
          settings: datasetSettings,
          config: visualization.config,
        });
      })
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
  updatedDashboardData,
}) {
  try {
    const dashboard = yield call(dashboardsAPIService.updateDashboard, dashboardId, {
      newVisualizationsId,
      deletedDashboardVisualizationsId,
      updatedDashboardData,
    });
    const arrayOfDataForVisualizations = yield all(
      dashboard.Visualizations.map((visualization) => {
        const datasetSettings = visualization.datasetSettings || [];
        return call(dbTableAPIService.getTableData, visualization.tableId, { settings: datasetSettings });
      })
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
