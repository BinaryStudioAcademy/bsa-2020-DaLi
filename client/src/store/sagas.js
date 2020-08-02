import { fork, all } from "redux-saga/effects";

function* exampleSaga () {}

export function* rootSaga() {
    yield all([fork(exampleSaga)]);
}