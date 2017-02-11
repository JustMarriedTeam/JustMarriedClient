import Immutable from 'immutable';
import {
  GUESTS_FETCHED,
} from '../../actions/wedding.actions';

export default function (guests = new Immutable.Map(), action) {
  switch (action.type) {
    case GUESTS_FETCHED:
      return guests.merge(action.guests);
    default:
      return guests;
  }
}
