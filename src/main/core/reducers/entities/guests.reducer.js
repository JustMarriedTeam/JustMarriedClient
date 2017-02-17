import Immutable from 'immutable';
import {
  GUESTS_FETCHED,
  ADD_GUEST,
} from '../../actions/guests.actions';
import mapValues from 'lodash/fp/mapValues';
import Guest from '../../models/guest.model';

const wrapAll = mapValues((raw) => new Guest(raw));

export default function (guests = new Immutable.Map(), action) {
  switch (action.type) {
    case GUESTS_FETCHED:
      return guests.merge(wrapAll(action.guests));
    case ADD_GUEST:
      const guest = action.guest;
      return guests.set(guest.id, new Guest(guest));
    default:
      return guests;
  }
}
