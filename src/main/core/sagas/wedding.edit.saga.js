import { take, race, select, put, call, fork } from 'redux-saga/effects';
import { selectParticipants } from '../selectors/participants.selector';
import { selectWedding } from '../selectors/wedding.selector';
import map from 'lodash/fp/map';
import includes from 'lodash/includes';
import { submit, isInvalid } from 'redux-form';
import {
  WEDDING_EDIT_STARTED,
  WEDDING_EDIT_CANCELLED,
  WEDDING_EDIT_SUBMITTED,
  WEDDING_EDIT_SUCCESSFUL,
  WEDDING_EDIT_VALIDATE,
  WEDDING_EDIT_FAILED,
  saveWedding,
  endWeddingEdit,
} from '../../core/actions/wedding.actions';

const getParticipantFormNames = (state) =>
  map((participant) => `ParticipantForm_${participant.role}`)(selectParticipants(state));

const submitForms = map((name) => put(submit(name)));
const takeAll = map((name) => take(name));

function * editWedding() {
  yield take(WEDDING_EDIT_SUBMITTED);
  const state = yield select();

  const formNames = getParticipantFormNames(state);
  const invalidForms = map((name) => isInvalid(name)(state))(formNames);
  if (!includes(invalidForms, true)) {
    yield submitForms(formNames);
  } else {
    yield put({
      type: WEDDING_EDIT_VALIDATE,
      message: 'Some values are invalid',
    });
    return;
  }

  yield takeAll(formNames);

  try {
    yield put(saveWedding(selectWedding(state)));
    yield put({
      type: WEDDING_EDIT_SUCCESSFUL,
      message: 'Wedding saved',
    });
  } catch (e) {
    yield put({
      type: WEDDING_EDIT_FAILED,
      message: 'Cannot save wedding',
    });
  }
}

function * editWeddingFlow() {
  while (true) { // eslint-disable-line
    yield take(WEDDING_EDIT_STARTED);

    yield race({
      commit: call(editWedding),
      cancel: take(WEDDING_EDIT_CANCELLED),
    });

    yield put(endWeddingEdit());
  }
}

export const weddingEditEvents = {
  successEventName: WEDDING_EDIT_SUCCESSFUL,
  cancelEventName: WEDDING_EDIT_CANCELLED,
  retryEventName: WEDDING_EDIT_VALIDATE,
  failureEventName: WEDDING_EDIT_FAILED,
};

export default function * root() {
  yield fork(editWeddingFlow);
}
