import { fork, all } from "redux-saga/effects";
import { exampleSaga } from "../containers/ExampleContainer/exampleSagas";
import tableVisualizationSagas from "../containers/TableVisualization/sagas";

export function* rootSaga() {
  yield all([fork(exampleSaga), tableVisualizationSagas()]);
}
