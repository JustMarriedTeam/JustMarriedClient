/* eslint-disable no-constant-condition */
import { take, call, put, fork, race } from 'redux-saga/effects';
import {
  signedIn,
  signedOut,
  accountStateChanged,
  localAccountBound,
  facebookAccountBound,
  googleAccountBound,
  RESTORE_AUTHENTICATION,
  SIGN_IN_VIA_LOCAL,
  BIND_LOCAL_ACCOUNT,
  SIGN_IN_VIA_FACEBOOK,
  BIND_FACEBOOK_ACCOUNT,
  SIGN_IN_VIA_GOOGLE,
  BIND_GOOGLE_ACCOUNT,
  SIGN_OUT,
} from '../actions/account.actions';
import { notifyRequestFailed } from '../actions/server.actions';
import { ACCOUNT_STATE } from '../models/account.model';
import { navigateToHome } from '../actions/navigation.actions';
import {
  storeAuthenticationToken,
  clearAuthenticationToken,
} from '../cookies';
import {
  signInViaLocal,
  bindAccountToLocal,
  signInViaFacebook,
  bindAccountToFacebook,
  signInViaGoogle,
  bindAccountToGoogle,
  invalidateToken,
} from '../api/auth.api';
import { getAccount } from '../api/account.api';

function * signInWithToken(token) {
  try {
    const account = yield call(getAccount, token);
    yield call(storeAuthenticationToken, token);
    yield put(signedIn({
      account,
      token,
    }));
  } catch (e) {
    yield call(clearAuthenticationToken);
  }
}

function * loginViaLocal(credentials) {
  yield put(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));
  try {
    return yield call(signInViaLocal, credentials);
  } catch (error) {
    yield put(notifyRequestFailed(error.message));
  }
  return false;
}

function * bindLocalAccount() {
  yield put(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));
  try {
    return yield call(bindAccountToLocal);
  } catch (error) {
    yield put(notifyRequestFailed(error.message));
  }
  return false;
}

function * loginViaGoogle() {
  yield put(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));
  try {
    return yield call(signInViaGoogle);
  } catch (error) {
    yield put(notifyRequestFailed(error.message));
  }
  return false;
}

function * bindGoogleAccount() {
  yield put(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));
  try {
    return yield call(bindAccountToGoogle);
  } catch (error) {
    yield put(notifyRequestFailed(error.message));
  }
  return false;
}

function * loginViaFacebook() {
  yield put(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));
  try {
    return yield call(signInViaFacebook);
  } catch (error) {
    yield put(notifyRequestFailed(error.message));
  }
  return false;
}

function * bindFacebookAccount() {
  yield put(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));
  try {
    return yield call(bindAccountToFacebook);
  } catch (error) {
    yield put(notifyRequestFailed(error.message));
  }
  return false;
}

function * logout() {
  try {
    const response = yield call(invalidateToken);
    yield call(clearAuthenticationToken);
    yield put(signedOut());
    yield put(navigateToHome());
    return response;
  } catch (error) {
    yield put(notifyRequestFailed(error.message));
  }
  return false;
}

function * loginViaLocalFlow() {
  while (true) {
    const { credentials } = yield take(SIGN_IN_VIA_LOCAL);

    const winner = yield race({
      auth: call(loginViaLocal, credentials),
      logout: take(SIGN_OUT),
    });

    if (winner.auth) {
      yield call(signInWithToken, winner.auth);
    } else {
      yield call(logout);
      yield put(navigateToHome);
    }
  }
}

function * bindLocalAccountFlow() {
  while (true) {
    yield take(BIND_LOCAL_ACCOUNT);

    const winner = yield race({
      auth: call(bindLocalAccount),
      logout: take(SIGN_OUT),
    });

    if (winner.auth) {
      yield put(localAccountBound(winner.auth));
    } else {
      yield call(logout);
      yield put(navigateToHome);
    }
  }
}

function * loginViaGoogleFlow() {
  while (true) {
    yield take(SIGN_IN_VIA_GOOGLE);

    const winner = yield race({
      auth: call(loginViaGoogle),
      logout: take(SIGN_OUT),
    });

    if (winner.auth) {
      yield call(signInWithToken, winner.auth);
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
      yield call(signInWithToken, winner.auth);
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

function * restoreAuthenticationFlow() {
  while (true) {
    const { token } = yield take(RESTORE_AUTHENTICATION);
    yield call(signInWithToken, token);
  }
}

function * logoutFlow() {
  while (true) { // eslint-disable-line
    yield take(SIGN_OUT);
    yield call(logout);
  }
}

export default function * root() {
  yield fork(loginViaLocalFlow);
  yield fork(bindLocalAccountFlow);
  yield fork(loginViaGoogleFlow);
  yield fork(bindGoogleAccountFlow);
  yield fork(loginViaFacebookFlow);
  yield fork(bindFacebookAccountFlow);
  yield fork(restoreAuthenticationFlow);
  yield fork(logoutFlow);
}
