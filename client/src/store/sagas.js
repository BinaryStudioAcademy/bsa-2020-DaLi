import { fork, all } from 'redux-saga/effects';

/* eslint-disable-next-line */
function* exampleSaga() {}

export function* rootSaga() {
  yield all([fork(exampleSaga)]);
}
