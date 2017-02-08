import { take, put, call, fork } from 'redux-saga/effects';
import {
  notifyEditFailed,
  notifyEditSucceeded,
  EDITING_ENDED } from '../actions/editing.actions';
import {
  notifySuccess,
  notifyError,
} from '../actions/alert.actions';

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
