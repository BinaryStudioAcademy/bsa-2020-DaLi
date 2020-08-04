import { all, put, takeEvery } from "redux-saga/effects";
import { orders } from "../../mock_orders";
import { FETCH_DATA_SUCCESS, FETCH_DATA_START } from "./types";

function* getData() {
  try {
    const data = orders;
    yield put({ type: FETCH_DATA_SUCCESS, data });
  } catch (error) {
    console.error(error);
  }
}

function* watchFetchData() {
  yield takeEvery(FETCH_DATA_START, getData);
}

export function* barChartSagas() {
  yield all([watchFetchData()]);
}
