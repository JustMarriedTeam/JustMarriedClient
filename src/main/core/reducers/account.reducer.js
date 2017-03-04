import {
  ACCOUNT_CHANGE_STATE,
  SIGNED_IN,
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
        state.delete('user');
      });
    case SIGNED_IN:
      return account.withMutations((state) => {
        state.set('state', ACCOUNT_STATE.SIGNED_IN);
        state.set('token', action.token);
        state.merge(action.account);
      });
    default:
      return account;
  }
}
