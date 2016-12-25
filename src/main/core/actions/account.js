import {openInPopup} from "../../utils/popupManager";

export const SIGNING_IN = 'SIGNING_IN';
export const SIGNED_IN_SUCCESSFULLY = 'SIGNED_IN_SUCCES';
export const COULD_NOT_SIGN_IN = 'SIGNED_IN_ERROR';

export const signingIn = (bool) => {
    return {type: SIGNING_IN, bool}
};

export const signedInSuccessfully = (user) => {
    return {type: SIGNED_IN_SUCCESSFULLY, user}
};

export const couldNotSignIn = (bool) => {
    return {type: COULD_NOT_SIGN_IN, bool}
};

export const signInViaFacebook = () => {
    return (dispatch) => {
        dispatch(signingIn(true));

        // window.location.href = "?backTo=http://localhost:3000/home";
        openInPopup('http://localhost:2701/api/auth/facebook', () => {
            console.log('came back!');
            dispatch(signingIn(false));
            // refactor for enums (loginState='LOGGING_IN', 'LOGGED_IN' etc., signedIn -> token do sth with it
            dispatch(signedInSuccessfully({
                token: 'xyz'
            }));
        });
    };
};