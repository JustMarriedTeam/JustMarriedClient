import Immutable from 'immutable';

export const ACCOUNT_STATE = {
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
  SIGNING_IN: 'SIGNING_IN',
  SIGNING_OUT: 'SIGNING_OUT',
  SIGNED_IN_SUCCESSFUL: 'SIGNED_IN_SUCCESSFUL',
  SIGNED_IN_FAILED: 'SIGNED_IN_FAILED',
};

export const ASSIGNED_ACTION = {
  FILL_WEDDING: 'FILL_WEDDING',
};

const Assignment = new Immutable.Record({
  action: '',
  done: false,
});

const AccountRecord = new Immutable.Record({
  id: null,
  login: null,
  token: null,
  state: ACCOUNT_STATE.SIGNED_OUT,
  user: {},
  assignments: [],
});

class Account extends AccountRecord {

  get user() {
    return super.user.toJS();
  }

  isSignedIn() {
    return this.state === ACCOUNT_STATE.SIGNED_IN;
  }

  getPendingAssignments() {
    return this.assignments
      .filter((assignment) => !assignment.done)
      .map((assignment) => new Assignment(assignment));
  }

}

export default Account;
