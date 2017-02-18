import { take, put, call, fork } from 'redux-saga/effects';
import {
  notifyEditFailed,
  notifyEditSucceeded,
  EDITING_STARTED,
  EDITING_ENDED } from '../actions/editing.actions';
import {
  notifySuccess,
  notifyError,
} from '../actions/alert.actions';

function * editFlow() {
  while (true) { // eslint-disable-line
    const { onEditStarted } = yield take(EDITING_STARTED);
    yield call(onEditStarted);
    const { onEditEnded } = yield take(EDITING_ENDED);
    try {
      yield call(onEditEnded);
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
