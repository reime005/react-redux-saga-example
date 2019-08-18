import {
  take,
  put,
  call,
  fork,
  select,
  all,
  delay,
  takeEvery,
  spawn
} from "redux-saga/effects";
import { testSetReduxAction } from "./rootReducer";
import { channel } from "redux-saga";

const TEST_SAGA_ACTION = "TEST_SAGA_ACTION";

export const testSagaAction = () => ({
  type: TEST_SAGA_ACTION
});

function* media() {
  yield delay(1000);
  yield put(testSetReduxAction());
}

function* handleRequest(chan) {
  const list = [];

  while (true) {
    const action = yield take(chan);

    while (list.some(task => task.isRunning())) {
      yield delay(500);
    }

    const task = yield fork(media, action);
    list.push(task);
  }
}

function* exampleSagaSerialized() {
  // create a channel to queue incoming requests
  const chan = yield call(channel);

  // create 1 worker 'threads'
  for (let i = 0; i < 1; i++) {
    yield fork(handleRequest, chan);
  }

  while (true) {
    const action = yield take(TEST_SAGA_ACTION);
    yield put(chan, action);
  }
}

function* exampleSagaConcurrent() {
  yield takeEvery(TEST_SAGA_ACTION, media);
}

export const rootSaga = function* rootSaga() {
  yield all([
    fork(exampleSagaSerialized)
    // fork(exampleSagaConcurrent),
  ]);
};
