import { GUEST_LOADED } from '../actions/guest.actions';
import Guest from '../models/guest.model';

export default function (guest = new Guest(), action) {
  switch (action.type) {
    case GUEST_LOADED:
      return new Guest(action.guest);
    default:
      return guest;
  }
}
