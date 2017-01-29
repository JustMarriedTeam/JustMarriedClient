import { take, put, call, fork } from 'redux-saga/effects';
import {
  notifyEditFailed,
  notifyEditSucceeded,
  EDITING_ENDED } from '../actions/editing.actions';

function * editFlow() {
  while (true) {
    const { commitMethod } = yield take(EDITING_ENDED);
    try {
      yield call(commitMethod);
      yield put(notifyEditSucceeded());
    } catch (error) {
      yield put(notifyEditFailed(error.message));
      // ask if reset values, immutable safe-copy from before modifications
    }
  }
}

export default function * root() {
  yield fork(editFlow);
}
