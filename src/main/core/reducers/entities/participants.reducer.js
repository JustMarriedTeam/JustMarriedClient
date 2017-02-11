import Immutable from 'immutable';
import {
  PARTICIPANTS_FETCHED,
} from '../../actions/wedding.actions';

export default function (participants = new Immutable.Map(), action) {
  switch (action.type) {
    case PARTICIPANTS_FETCHED:
      return participants.merge(action.participants);
    default:
      return participants;
  }
}
