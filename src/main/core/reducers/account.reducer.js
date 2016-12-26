import { ACCOUNT_CHANGE_STATE } from '../actions/account.actions';
import Account from '../models/account.model';

function stateChanged(account, action) {
  return account.merge({
    state: action.state,
  });
}

export default function (account = new Account(), action) {
  switch (action.type) {
    case ACCOUNT_CHANGE_STATE:
      return stateChanged(account, action);
    default:
      return account;
  }
}
