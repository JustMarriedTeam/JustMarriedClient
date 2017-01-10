/* eslint-disable no-constant-condition */
import { take, call, put, fork, race } from 'redux-saga/effects';
import {
  accountStateChanged,
  authenticateWithToken,
  facebookAccountBound,
  googleAccountBound,
  SIGN_IN_VIA_FACEBOOK,
  BIND_FACEBOOK_ACCOUNT,
  SIGN_IN_VIA_GOOGLE,
  BIND_GOOGLE_ACCOUNT,
  SIGN_OUT } from '../actions/account.actions';
import { sendingRequest, notifyRequestFailed } from '../actions/server.actions';
import { ACCOUNT_STATE } from '../models/account.model';
import { navigateToDashboard, navigateToHome } from '../actions/navigation.actions';
import {
  signInViaFacebook,
  bindAccountToFacebook,
  signInViaGoogle,
  bindAccountToGoogle,
  signOut,
} from '../api/auth.api';

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

export function * bindGoogleAccount() {
  yield put(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));
  yield put(sendingRequest(true));
  try {
    return yield call(bindAccountToGoogle);
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

export function * bindFacebookAccount() {
  yield put(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));
  yield put(sendingRequest(true));
  try {
    return yield call(bindAccountToFacebook);
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

    if (winner.auth) {
      yield put(authenticateWithToken(winner.auth));
      yield put(navigateToDashboard);
    } else {
      yield call(logout);
      yield put(navigateToHome);
    }
  }
}

function * bindGoogleAccountFlow() {
  while (true) {
    yield take(BIND_GOOGLE_ACCOUNT);

    const winner = yield race({
      auth: call(bindGoogleAccount),
      logout: take(SIGN_OUT),
    });

    if (winner.auth) {
      yield put(googleAccountBound(winner.auth));
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

function * bindFacebookAccountFlow() {
  while (true) {
    yield take(BIND_FACEBOOK_ACCOUNT);

    const winner = yield race({
      auth: call(bindFacebookAccount),
      logout: take(SIGN_OUT),
    });

    if (winner.auth) {
      yield put(facebookAccountBound(winner.auth));
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
  yield fork(bindGoogleAccountFlow);
  yield fork(loginViaFacebookFlow);
  yield fork(bindFacebookAccountFlow);
  yield fork(logoutFlow);
}
