import { take, put, race, call, fork } from 'redux-saga/effects';
import {
  SELECT_MULTIPLE,
  SELECT_CANCELLED,
  REMOVE_MULTIPLE,
  selectionStarted,
  selectionEnded,
} from '../actions/selection.actions';

function * removeFlow() {
  const { onRemove } = yield take(REMOVE_MULTIPLE);
  yield call(onRemove);
}

function * selectionFlow() {
  while (true) { // eslint-disable-line
    const { onSelect } = yield take(SELECT_MULTIPLE);
    yield call(onSelect);
    yield put(selectionStarted());

    yield race({
      remove: call(removeFlow),
      cancel: take(SELECT_CANCELLED),
    });

    yield put(selectionEnded());
  }
}

export default function * root() {
  yield fork(selectionFlow);
}
