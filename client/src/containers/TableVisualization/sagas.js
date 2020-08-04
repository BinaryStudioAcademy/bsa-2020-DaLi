import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "./actionTypes";
import { getData } from "./services";

export function* fetchData() {
  try {
    const data = yield call(getData);
    yield put({ type: FETCH_DATA_SUCCESS, payload: { data } });
  } catch (error) {
    yield put({ type: FETCH_DATA_ERROR, payload: { error } });
  }
}

function* watchFetchData() {
  yield takeEvery(FETCH_DATA, fetchData);
}

export default function* tableVisualizationSagas() {
  yield all([watchFetchData()]);
}
