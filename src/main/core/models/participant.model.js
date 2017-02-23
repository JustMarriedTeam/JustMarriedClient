import Immutable from 'immutable';
import store from '../store';
import merge from 'lodash/merge';

const ParticipantRecord = new Immutable.Record({
  id: '',
  user: '',
  role: '',
  active: false,
});

/**
 * A wrapper for convenient access to participant.
 * Reads properties from state entities.
 */
class Participant extends ParticipantRecord {

  get user() {
    const userId = this.get('user');
    const entities = store.getState().entities;
    return entities.users.get(userId);
  }

  toJS() {
    const user = !!this.user ? this.user.toJS() : {};
    return merge(super.toJS(), {
      user,
    });
  }

}

export default Participant;
