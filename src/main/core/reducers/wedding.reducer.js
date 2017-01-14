import { GUESTS_FETCHED, REMOVE_GUESTS } from '../actions/wedding.actions';
import Wedding from '../models/wedding.model';

export default function (wedding = new Wedding(), action) {
  switch (action.type) {
    case GUESTS_FETCHED:
      return wedding.set('guests', action.guests);
    case REMOVE_GUESTS:
      return wedding.removeGuests(action.guests);
    default:
      return wedding;
  }
}
