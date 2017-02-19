// http://stackoverflow.com/questions/38405700/getstate-in-redux-saga
import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import {
  displayAcknowledgePopup,
  POPUP_CONFIRMED,
} from '../actions/popup.actions';
import { SIGNED_IN } from '../actions/account.actions';

function * weddingWizard() {
  yield put(displayAcknowledgePopup({
    title: 'Create your wedding',
    content: <span>Fill in the information about the wedding such as participants,
      guests, budget and others.</span>,
  }));

  yield take(POPUP_CONFIRMED);
}

function * weddingWizardFlow() {
  while (true) { // eslint-disable-line
    yield take(SIGNED_IN);
    yield call(weddingWizard);
  }
}

export default function * root() {
  yield fork(weddingWizardFlow);
}
