import Immutable from 'immutable';
import {
  GUESTS_FETCHED,
  ADD_GUEST,
  UPDATE_GUEST,
} from '../../actions/guests.actions';
import mapValues from 'lodash/fp/mapValues';
import Guest from '../../models/guest.model';

const wrapAll = mapValues((raw) => new Guest(raw));

export default function (guests = new Immutable.Map(), action) {
  const guest = action.guest;
  switch (action.type) {
    case GUESTS_FETCHED:
      return guests.merge(wrapAll(action.guests));
    case UPDATE_GUEST:
      return guests.set(guest.id, new Guest(guest));
    case ADD_GUEST:
      return guests.set(guest.id, new Guest(guest));
    default:
      return guests;
  }
}
