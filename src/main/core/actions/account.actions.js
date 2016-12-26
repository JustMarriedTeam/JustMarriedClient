export const ACCOUNT_CHANGE_STATE = 'CHANGING_ACCOUNT_STATE';
export const SIGN_IN_VIA_FACEBOOK = 'SIGN_IN_VIA_FACEBOOK';
export const SIGN_OUT = 'SIGN_OUT';
export const AUTHENTICATE_WITH_TOKEN = 'AUTHENTICATE_WITH_TOKEN';

export const accountStateChanged = (state) => ({ type: ACCOUNT_CHANGE_STATE, state });

export const authenticateWithToken = (token) => ({ type: AUTHENTICATE_WITH_TOKEN, token });

export const signInViaFacebook = () => (dispatch) => dispatch({ type: SIGN_IN_VIA_FACEBOOK });
