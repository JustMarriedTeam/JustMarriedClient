import {
  ACCOUNT_CHANGE_STATE,
  AUTHENTICATE_WITH_TOKEN,
  ACCOUNT_RETRIEVED,
  SIGNED_OUT,
} from '../actions/account.actions';
import Account, { ACCOUNT_STATE } from '../models/account.model';

export default function (account = new Account(), action) {
  switch (action.type) {
    case ACCOUNT_CHANGE_STATE:
      return account.set('state', action.state);
    case SIGNED_OUT:
      return account.withMutations((state) => {
        state.set('state', ACCOUNT_STATE.SIGNED_OUT);
        state.delete('token');
      });
    case AUTHENTICATE_WITH_TOKEN:
      return account.withMutations((state) => {
        state.set('state', ACCOUNT_STATE.SIGNED_IN);
        state.set('token', action.token);
      });
    case ACCOUNT_RETRIEVED:
      return account.merge(action.account);
    default:
      return account;
  }
}
