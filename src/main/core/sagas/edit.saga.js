import { take, put, race, call, fork } from 'redux-saga/effects';
import {
  notifyEditSucceeded,
  notifyEditFailed,
  EDITS_STARTED,
  EDITS_SUBMITTED,
  EDITS_CANCELLED,
} from '../actions/editing.actions';
import {
  notifySuccess,
  notifyInfo,
  notifyError,
} from '../actions/alert.actions';
import ValidationError from '../errors/validation.error';

function * submitFlow() {
  const { onEditsSubmitted } = yield take(EDITS_SUBMITTED);
  try {
    yield call(onEditsSubmitted);
    yield put(notifySuccess());
    return { done: true };
  } catch (e) {
    if (e instanceof ValidationError) {
      yield put(notifyInfo(e.message));
      return { done: false };
    } else {
      yield put(notifyError(e.message));
      return { done: false };
    }
  }
}

function * editFlow() {
  while (true) {
    const { onEditsStarted } = yield take(EDITS_STARTED);
    yield call(onEditsStarted);

    while (true) {
      const winner = yield race({
        submit: call(submitFlow),
        cancel: take(EDITS_CANCELLED),
      });

      if (winner.submit) {
        const { done } = winner.submit;
        if (done) {
          yield put(notifyEditSucceeded('Saved'));
          break;
        }
      } else if (winner.cancel) {
        yield put(notifyEditFailed('Cancelled'));
        break;
      }
    }
  }
}

export default function * root() {
  yield fork(editFlow);
}
