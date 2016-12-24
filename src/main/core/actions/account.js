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

        fetch("http://localhost:2701/api/auth/facebook")
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(signingIn(false));
                return response;
            })
            .then((response) => response.json())
            .then((user) => dispatch(signedInSuccessfully(user)))
            .catch(() => dispatch(couldNotSignIn(true)));
    };
};