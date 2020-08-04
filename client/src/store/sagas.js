import { fork, all } from "redux-saga/effects";
import { exampleSaga } from "../containers/ExampleContainer/exampleSagas";
import { barChartSagas } from "../containers/BarChart/barChartSagas";

export function* rootSaga() {
  yield all([fork(exampleSaga), barChartSagas()]);
}
