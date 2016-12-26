import {openInPopup} from "../../utils/popupManager";

export const ACCOUNT_STATE = {
    SIGNED_IN: 'SIGNED_IN',
    SIGNED_OUT: 'SIGNED_OUT',
    SIGNING_IN: 'SIGNING_IN',
    SIGNING_OUT: 'SIGNING_OUT',
    SIGNED_IN_SUCCESSFUL: 'SIGNED_IN_SUCCESSFUL',
    SIGNED_IN_FAILED: 'SIGNED_IN_FAILED',
};

export const ACCOUNT_CHANGE_STATE = 'CHANGING_ACCOUNT_STATE';

export const accountStateChanged = (state) => {
    return {type: ACCOUNT_CHANGE_STATE, state}
};

export const signInViaFacebook = (dispatch) => {
    dispatch(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));

    openInPopup('http://localhost:2701/api/auth/facebook', () => {
        dispatch(accountStateChanged(ACCOUNT_STATE.SIGNED_IN_SUCCESSFUL));
        dispatch(accountStateChanged(ACCOUNT_STATE.SIGNED_IN));
    });
};