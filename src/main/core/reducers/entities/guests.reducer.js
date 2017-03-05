import Immutable from 'immutable';
import {
  GUESTS_FETCHED,
  ADD_GUEST,
  UPDATE_GUEST,
  REMOVE_GUESTS,
} from '../../actions/guests.actions';
import mapValues from 'lodash/fp/mapValues';
import forEach from 'lodash/fp/forEach';
import Guest from '../../models/guest.model';
import { mapToIds } from '../../utils/reducer.utils';

const wrapAll = mapValues((raw) => new Guest(raw));

export default function (guests = new Immutable.Map(), action) {
  const guest = action.guest;
  switch (action.type) {
    case GUESTS_FETCHED:
      return new Immutable.Map(wrapAll(action.guests));
    case UPDATE_GUEST:
      return guests.set(guest.id, new Guest(guest));
    case ADD_GUEST:
      return guests.set(guest.id, new Guest(guest));
    case REMOVE_GUESTS:
      return guests.withMutations((mutableGuests) => {
        let guestsLeft = mutableGuests;
        forEach((guestToRemove) => {
          guestsLeft = guestsLeft.remove(guestToRemove);
        })(mapToIds(action.guests));
        return guestsLeft;
      });
    default:
      return guests;
  }
}
