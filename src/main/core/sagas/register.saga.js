/* eslint-disable no-constant-condition */
import { take, call, fork, put } from 'redux-saga/effects';
import {
  SIGN_UP_VIA_LOCAL,
  authenticateWithToken,
} from '../actions/account.actions';
import {
  signUpViaLocal,
} from '../api/auth.api';
import { navigateToDashboard } from '../actions/navigation.actions';
import { storeAuthenticationToken } from '../cookies';

function * registerViaLocal(credentials) {
  const { token } = yield call(signUpViaLocal, credentials);
  yield call(storeAuthenticationToken, token);
  yield put(authenticateWithToken(token));
  yield put(navigateToDashboard());
}

function * registerViaLocalFlow() {
  while (true) {
    const { credentials } = yield take(SIGN_UP_VIA_LOCAL);
    yield call(registerViaLocal, credentials);
  }
}

export default function * root() {
  yield fork(registerViaLocalFlow);
}
