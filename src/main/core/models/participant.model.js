import Immutable from 'immutable';
import store from '../store';
import merge from 'lodash/merge';

const ParticipantRecord = new Immutable.Record({
  id: String,
  user: String,
  role: String,
  active: Boolean,
});

/**
 * A wrapper for convenient access to participant.
 * Reads properties from state entities.
 */
class Participant extends ParticipantRecord {

  get user() {
    return store.getState().entities.users.get(this.get('user'));
  }

  toJS() {
    // todo: deserialize using normalizr
    return merge(super.toJS(), {
      user: this.user.toJS(),
    });
  }

}

export default Participant;
