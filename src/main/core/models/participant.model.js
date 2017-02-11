import Immutable from 'immutable';

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

}

export default Participant;
