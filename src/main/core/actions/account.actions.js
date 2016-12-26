export const ACCOUNT_CHANGE_STATE = 'CHANGING_ACCOUNT_STATE';
export const SIGN_IN_VIA_FACEBOOK = 'CHANGING_ACCOUNT_STATE';
export const SIGN_OUT = 'SIGN_OUT';
export const AUTHENTICATE_WITH_TOKEN = 'SIGN_OUT';

export const accountStateChanged = (state) => ({ type: ACCOUNT_CHANGE_STATE, state });

export const authenticateWithToken = (token) => ({ type: AUTHENTICATE_WITH_TOKEN, token });

export const signInViaFacebook = () => (dispatch) => dispatch({ type: SIGN_IN_VIA_FACEBOOK });

//
// export const signInViaFacebook = () => (dispatch) => {
//   dispatch(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));
//
//   openInPopup('http://localhost:2701/api/auth/facebook', () => {
//     dispatch(accountStateChanged(ACCOUNT_STATE.SIGNED_IN_SUCCESSFUL));
//     dispatch(accountStateChanged(ACCOUNT_STATE.SIGNED_IN));
//   });
// };
