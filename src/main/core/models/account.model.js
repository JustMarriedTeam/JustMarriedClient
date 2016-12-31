import Immutable from 'immutable';

export const ACCOUNT_STATE = {
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
  SIGNING_IN: 'SIGNING_IN',
  SIGNING_OUT: 'SIGNING_OUT',
  SIGNED_IN_SUCCESSFUL: 'SIGNED_IN_SUCCESSFUL',
  SIGNED_IN_FAILED: 'SIGNED_IN_FAILED',
};

const AccountRecord = new Immutable.Record({
  state: ACCOUNT_STATE.SIGNED_OUT,
  token: null,
});

class Account extends AccountRecord {

}

export default Account;
