import { ACCOUNT_CHANGE_STATE, AUTHENTICATE_WITH_TOKEN } from '../actions/account.actions';
import Account, { ACCOUNT_STATE } from '../models/account.model';

export default function (account = new Account(), action) {
  switch (action.type) {
    case ACCOUNT_CHANGE_STATE:
      return account.set('state', action.state);
    case AUTHENTICATE_WITH_TOKEN:
      return account.withMutations((state) => {
        state.set('state', ACCOUNT_STATE.SIGNED_IN);
        state.set('token', action.token);
      });
    default:
      return account;
  }
}
