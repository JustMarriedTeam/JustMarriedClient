import { take, put, call, fork, delay } from 'redux-saga/effects';
import {
  notifyEditFailed,
  notifyEditSucceeded,
  EDITING_ENDED } from '../actions/editing.actions';
import {
  notifySuccess,
  notifyError,
} from '../actions/notification.actions';

function * editFlow() {
  while (true) {
    const { commitMethod } = yield take(EDITING_ENDED);
    try {
      yield call(commitMethod);
      yield put(notifySuccess('Saved'));
      yield put(notifyEditSucceeded());
    } catch (error) {
      yield put(notifyError(error.message));
      yield put(notifyEditFailed(error.message));
    }
  }
}

export default function * root() {
  yield fork(editFlow);
}
