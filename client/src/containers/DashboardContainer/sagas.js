import { put, call, takeEvery, all } from 'redux-saga/effects';
import { GET_DASHBOARD, GET_DASHBOARD_ERROR, GET_DASHBOARD_SUCCESS } from './actionsTypes';
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

export default function* currentDashboardSaga() {
  yield all([watchGetDashboardSaga()]);
}
