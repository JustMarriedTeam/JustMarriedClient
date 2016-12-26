import {openInPopup} from "../../utils/popupManager";
import {ACCOUNT_STATE} from "../models/account.model";

export const ACCOUNT_CHANGE_STATE = 'CHANGING_ACCOUNT_STATE';

export const accountStateChanged = (state) => {
    return {type: ACCOUNT_CHANGE_STATE, state}
};

export const signInViaFacebook = () => (dispatch) => {
    dispatch(accountStateChanged(ACCOUNT_STATE.SIGNING_IN));

    openInPopup('http://localhost:2701/api/auth/facebook', () => {
        dispatch(accountStateChanged(ACCOUNT_STATE.SIGNED_IN_SUCCESSFUL));
        dispatch(accountStateChanged(ACCOUNT_STATE.SIGNED_IN));
    });
};