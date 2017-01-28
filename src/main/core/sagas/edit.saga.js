import { take, put, call, fork } from 'redux-saga/effects';
import {
  notifyEditFailed,
  notifyEditSucceeded,
  EDITING_STARTED,
  EDITING_ENDED } from '../actions/editing.actions';

function * editFlow() {
  while (true) {
    const { editedResource } = yield take(EDITING_STARTED);
    const { savingMethod } = yield take(EDITING_ENDED);
    try {
      call(savingMethod);
      yield put(notifyEditSucceeded());
    } catch (error) {
      yield put(notifyEditFailed(error.message, editedResource));
      // ask if reset values, immutable safe-copy from before modifications
    }
  }
}

export default function * root() {
  yield fork(editFlow);
}
