import Immutable from "immutable";
import store from "../store";
import {denormalizeParticipant} from "../normalization/wedding.normalizer";

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
    const p = super.toJS();
    const participant = denormalizeParticipant(p, store.getState().entities);
    return participant;
  }

}

export default Participant;
