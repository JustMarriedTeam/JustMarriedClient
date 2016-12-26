import { take, call, put, fork, race } from 'redux-saga/effects';
import {
  accountStateChanged,
  authenticateWithToken,
  SIGN_IN_VIA_FACEBOOK,
  SIGN_IN_VIA_GOOGLE,
  SIGN_OUT } from '../actions/account.actions';
import { sendingRequest, notifyRequestFailed } from '../actions/server.actions';
import { ACCOUNT_STATE } from '../models/account.model';
import { navigateToDashboard, navigateToHome } from '../actions/navigation.actions';
import { signInViaFacebook, signInViaGoogle, signOut } from '../api/auth.api';

export function * loginViaGoogle() {
  yield put(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));
  yield put(sendingRequest(true));
  try {
    return yield call(signInViaGoogle);
  } catch (error) {
    yield put(notifyRequestFailed(error.message));
  } finally {
    yield put(sendingRequest(false));
  }
  return false;
}

export function * loginViaFacebook() {
  yield put(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));
  yield put(sendingRequest(true));
  try {
    return yield call(signInViaFacebook);
  } catch (error) {
    yield put(notifyRequestFailed(error.message));
  } finally {
    yield put(sendingRequest(false));
  }
  return false;
}

export function * logout() {
  yield put(sendingRequest(true));
  try {
    const response = yield call(signOut);
    yield put(sendingRequest(false));
    return response;
  } catch (error) {
    yield put(notifyRequestFailed(error.message));
  } finally {
    yield put(sendingRequest(false));
  }
  return false;
}

function * loginViaGoogleFlow() {
  while (true) {
    yield take(SIGN_IN_VIA_GOOGLE);

    const winner = yield race({
      auth: call(loginViaGoogle),
      logout: take(SIGN_OUT),
    });

    console.log(JSON.stringify(winner));
    if (winner.auth) {
      console.log('in');
      yield put(authenticateWithToken(winner.auth));
      yield put(navigateToDashboard);
    } else {
      yield call(logout);
      yield put(navigateToHome);
    }
  }
}

function * loginViaFacebookFlow() {
  while (true) {
    yield take(SIGN_IN_VIA_FACEBOOK);

    const winner = yield race({
      auth: call(loginViaFacebook),
      logout: take(SIGN_OUT),
    });

    if (winner.auth) {
      yield put(authenticateWithToken(winner.auth));
      yield put(navigateToDashboard);
    } else {
      yield call(logout);
      yield put(navigateToHome);
    }
  }
}

function * logoutFlow() {
  while (true) {
    yield take(SIGN_OUT);
  }
}

export default function * root() {
  yield fork(loginViaGoogleFlow);
  yield fork(loginViaFacebookFlow);
  yield fork(logoutFlow);
}
