import {SIGNING_IN, SIGNED_IN_SUCCESSFULLY, COULD_NOT_SIGN_IN} from "../actions/account";

let INITIAL_ACCOUNT = {
    isSigningIn: false,
    signInSuccess: false,
    signInFailure: false
};

function signingIn(account, action) {
    return Object.assign({}, account, {
        isSigningIn: action.bool
    });
}

function signedInSuccessfully(account, action) {
    return Object.assign({}, account, {
        signInSuccess: action.bool
    });
}

function couldNotSignIn(account, action) {
    return Object.assign({}, account, {
        signInFailure: action.bool
    });
}

export default function (account = INITIAL_ACCOUNT, action) {
    switch (action.type) {
        case SIGNING_IN:
            return signingIn(account, action);
        case SIGNED_IN_SUCCESSFULLY:
            return signedInSuccessfully(account, action);
        case COULD_NOT_SIGN_IN:
            return couldNotSignIn(account, action);
        default:
            return account;
    }
};