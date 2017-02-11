import Immutable from 'immutable';
import {
  ADD_GUEST,
  UPDATE_GUEST,
  REMOVE_GUESTS,
} from '../../actions/wedding.actions';

export default function (participants = new Immutable.Map(), action) {
  switch (action.type) {
    case ADD_GUEST:
    case UPDATE_GUEST:
      return participants.set(action.guest.id, action.guest);
    case REMOVE_GUESTS:
      return participants.delete(action.guest.id);
    default:
      return participants;
  }
}
