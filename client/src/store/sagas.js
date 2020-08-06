import { fork, all } from "redux-saga/effects";
import { exampleSaga } from "../containers/ExampleContainer/exampleSagas";

export function* rootSaga() {
  yield all([fork(exampleSaga)]);
}
