export const ACCOUNT_CHANGE_STATE = 'CHANGING_ACCOUNT_STATE';

export const AUTHENTICATE_WITH_TOKEN = 'AUTHENTICATE_WITH_TOKEN';

export const SIGN_IN_VIA_LOCAL = 'SIGN_IN_VIA_LOCAL';
export const SIGN_UP_VIA_LOCAL = 'SIGN_UP_VIA_LOCAL';
export const BIND_LOCAL_ACCOUNT = 'BIND_LOCAL_ACCOUNT';
export const LOCAL_ACCOUNT_BOUND = 'LOCAL_ACCOUNT_BOUND';

export const SIGN_IN_VIA_FACEBOOK = 'SIGN_IN_VIA_FACEBOOK';
export const BIND_FACEBOOK_ACCOUNT = 'BIND_FACEBOOK_ACCOUNT';
export const FACEBOOK_ACCOUNT_BOUND = 'FACEBOOK_ACCOUNT_BOUND';

export const SIGN_IN_VIA_GOOGLE = 'SIGN_IN_VIA_GOOGLE';
export const BIND_GOOGLE_ACCOUNT = 'BIND_GOOGLE_ACCOUNT';
export const GOOGLE_ACCOUNT_BOUND = 'GOOGLE_ACCOUNT_BOUND';

export const SIGN_OUT = 'SIGN_OUT';
export const SIGNED_OUT = 'SIGNED_OUT';

/*
  Passive
 */

export const signOut = () => ({ type: SIGN_OUT });

export const signedOut = () => ({ type: SIGNED_OUT });

export const localAccountBound = (state) => ({ type: LOCAL_ACCOUNT_BOUND, state });

export const facebookAccountBound = (state) => ({ type: FACEBOOK_ACCOUNT_BOUND, state });

export const googleAccountBound = (state) => ({ type: GOOGLE_ACCOUNT_BOUND, state });

export const accountStateChanged = (state) => ({ type: ACCOUNT_CHANGE_STATE, state });

export const authenticateWithToken = (token) => ({ type: AUTHENTICATE_WITH_TOKEN, token });

/*
  Active
 */


export const signUpViaLocalAccount = (credentials) => ({ type: SIGN_UP_VIA_LOCAL, credentials });

export const signInViaLocal = (credentials) => (dispatch) =>
  dispatch({ type: SIGN_IN_VIA_LOCAL, credentials });

export const bindLocalAccount = () => (dispatch) => dispatch({ type: BIND_LOCAL_ACCOUNT });

export const signInViaFacebook = () => (dispatch) => dispatch({ type: SIGN_IN_VIA_FACEBOOK });

export const bindFacebookAccount = () => (dispatch) => dispatch({ type: BIND_FACEBOOK_ACCOUNT });

export const signInViaGoogle = () => (dispatch) => dispatch({ type: SIGN_IN_VIA_GOOGLE });

export const bindGoogleAccount = () => (dispatch) => dispatch({ type: BIND_GOOGLE_ACCOUNT });
