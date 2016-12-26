import Immutable from 'immutable';

export const ACCOUNT_STATE = {
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
  SIGNING_IN: 'SIGNING_IN',
  SIGNING_OUT: 'SIGNING_OUT',
  SIGNED_IN_SUCCESSFUL: 'SIGNED_IN_SUCCESSFUL',
  SIGNED_IN_FAILED: 'SIGNED_IN_FAILED',
};

const AccountRecord = Immutable.Record({
  state: ACCOUNT_STATE.SIGNED_OUT,
});

class Account extends AccountRecord {

  isDone() {
    return this.get('done');
  }

  getLabel() {
    return this.get('label') || 'New Task';
  }

}

export default Account;
