import { take, put, race, call, fork } from 'redux-saga/effects';
import {
  notifyEditFailed,
  notifyEditSucceeded,
  EDITING_STARTED,
  EDITING_ENDED } from '../actions/editing.actions';
import {
  notifySuccess,
  notifyInfo,
  notifyError,
} from '../actions/alert.actions';

function * editingAction(onEditEnded) {
  const {
    successEventName,
    cancelEventName,
    retryEventName,
    failureEventName,
  } = yield call(onEditEnded);

  const actionTaken = yield race({
    success: take(successEventName),
    retry: take(retryEventName),
    failure: take(failureEventName),
    cancel: take(cancelEventName),
  });

  if (actionTaken.success) {
    yield put(notifySuccess(actionTaken.success.message));
    yield put(notifyEditSucceeded());
  } else if (actionTaken.retry) {
    yield put(notifyInfo(actionTaken.retry.message));
  } else if (actionTaken.failure) {
    yield put(notifyError(actionTaken.failure.message));
    yield put(notifyEditFailed());
  } else {
    yield put(notifyInfo(actionTaken.cancel.message));
    yield put(notifyEditSucceeded());
  }

  return !!actionTaken.retry;
}

function * editFlow() {
  while (true) { // eslint-disable-line
    const { onEditStarted } = yield take(EDITING_STARTED);
    yield call(onEditStarted);

    let keepTrying = true;
    while (keepTrying) { // eslint-disable-line
      const { onEditEnded } = yield take(EDITING_ENDED);
      keepTrying = yield call(editingAction, onEditEnded);
    }
  }
}

export default function * root() {
  yield fork(editFlow);
}
