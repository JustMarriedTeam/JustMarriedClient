import Immutable from 'immutable';
import {
  PARTICIPANTS_FETCHED,
  UPDATE_PARTICIPANT,
  TOGGLE_PARTICIPANT,
} from '../../actions/wedding.actions';

export default function (participants = new Immutable.Map(), action) {
  switch (action.type) {
    case PARTICIPANTS_FETCHED:
      return participants.merge(action.participants);
    case TOGGLE_PARTICIPANT:
      return participants.toggleParticipant(action.participant);
    case UPDATE_PARTICIPANT:
      return participants.updateParticipant(action.participant);
    default:
      return participants;
  }
}
