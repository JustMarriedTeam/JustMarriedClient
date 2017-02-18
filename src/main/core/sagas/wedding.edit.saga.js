// http://stackoverflow.com/questions/38405700/getstate-in-redux-saga
import { take, race, select, put, call, fork } from 'redux-saga/effects';
import { selectParticipants } from '../selectors/participants.selector';
import { selectWedding } from '../selectors/wedding.selector';
import map from 'lodash/fp/map';
import includes from 'lodash/includes';
import SavingError from '../errors/saving.error';
import { submit, isInvalid } from 'redux-form';
import {
  WEDDING_EDIT_STARTED,
  WEDDING_EDIT_CANCELLED,
  WEDDING_EDIT_SUBMITTED,
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
  const invalidForms = map(formNames, (name) => isInvalid(name)(state));
  if (!includes(invalidForms, true)) {
    yield submitForms(formNames);
  } else {
    throw new SavingError('Check your input');
  }

  yield takeAll(formNames);

  yield put(saveWedding(selectWedding(state)));
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

export default function * root() {
  yield fork(editWeddingFlow);
}
