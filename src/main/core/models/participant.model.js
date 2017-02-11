import Immutable from 'immutable';
import store from '../store';

const ParticipantRecord = new Immutable.Record({
  id: String,
  user: String,
  role: String,
});

/**
 * A wrapper for convenient access to participant.
 * Reads properties from state entities.
 */
class Participant extends ParticipantRecord {

  get user() {
    return store.getState().entities.users.get(this.get('user'));
  }

}

export default Participant;
