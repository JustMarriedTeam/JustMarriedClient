import {ACCOUNT_CHANGE_STATE, ACCOUNT_STATE} from "../actions/account";
import {Map} from "immutable";

let INITIAL_ACCOUNT = Map({
    state: ACCOUNT_STATE.SIGNED_OUT
});

function stateChanged(account, action) {
    return account.merge({
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