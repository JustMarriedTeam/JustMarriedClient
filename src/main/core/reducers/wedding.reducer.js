import {
  WEDDING_FETCHED,
  WEDDING_SAVED,
  ADD_GUEST,
  UPDATE_GUEST,
  REMOVE_GUESTS,
  UPDATE_PARTICIPANT,
  TOGGLE_PARTICIPANT,
  TASKS_LOADED,
} from '../actions/wedding.actions';
import Wedding from '../models/wedding.model';

export default function (wedding = new Wedding(), action) {
  switch (action.type) {
    case WEDDING_FETCHED:
    case WEDDING_SAVED:
      return new Wedding(action.wedding);
    case TASKS_LOADED:
      return wedding.set('tasks', action.tasks);
    case REMOVE_GUESTS:
      return wedding.removeGuests(action.guests);
    case ADD_GUEST:
      return wedding.addGuest(action.guest);
    case UPDATE_GUEST:
      return wedding.updateGuest(action.guest);
    case TOGGLE_PARTICIPANT:
      return wedding.toggleParticipant(action.participant);
    case UPDATE_PARTICIPANT:
      return wedding.updateParticipant(action.participant);
    default:
      return wedding;
  }
}
