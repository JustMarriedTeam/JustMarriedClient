import { GUESTS_FETCHED } from '../actions/wedding.actions';
import Wedding from '../models/wedding.model';

export default function (wedding = new Wedding(), action) {
  switch (action.type) {
    case GUESTS_FETCHED:
      return wedding.set('guests', action.guests);
    default:
      return wedding;
  }
}
