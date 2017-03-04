// http://stackoverflow.com/questions/38405700/getstate-in-redux-saga
import React from 'react';
import { take, put, select, call, fork } from 'redux-saga/effects';
import {
  displayAcknowledgePopup,
  POPUP_CONFIRMED,
} from '../actions/popup.actions';
import { SIGNED_IN } from '../actions/account.actions';
import { ASSIGNED_ACTION } from '../models/account.model';
import { navigateToWedding, navigateToDashboard } from '../actions/navigation.actions';

const pendingAssignments = (state) => state.account.getPendingAssignments();

function * fillWeddingFlow() {
  yield put(displayAcknowledgePopup({
    title: 'Create your wedding',
    content: <span>Fill in the information about the wedding such as participants,
      guests, budget and others.</span>,
  }));

  yield take(POPUP_CONFIRMED);
  yield put(navigateToWedding());
}

function * loginWelcomeFlow() {
  while (true) { // eslint-disable-line
    yield take(SIGNED_IN);
    const location = yield select((state) => state.routing.locationBeforeTransitions);
    if (location.pathname === '/home') {
      const assignmentsList = yield select(pendingAssignments);

      if (assignmentsList.size > 0) {
        for (const assignment of assignmentsList) {
          switch (assignment.action) {
            case ASSIGNED_ACTION.FILL_WEDDING:
              yield call(fillWeddingFlow);
              break;
            default:
              throw new Error('Unknown assignment');
          }
        }
      } else {
        yield put(navigateToDashboard());
      }
    }
  }
}

export default function * root() {
  yield fork(loginWelcomeFlow);
}
