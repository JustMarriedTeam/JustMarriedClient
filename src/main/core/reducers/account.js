import {ACCOUNT_CHANGE_STATE, ACCOUNT_STATE} from "../actions/account";

let INITIAL_ACCOUNT = {
    state: ACCOUNT_STATE.SIGNED_OUT
};

function stateChanged(account, action) {
    return Object.assign({}, account, {
        state: action.state
    });
}

export default function (account = INITIAL_ACCOUNT, action) {
    switch (action.type) {
        case ACCOUNT_CHANGE_STATE:
            return stateChanged(account, action);
        default:
            return account;
    }
};