import Immutable from 'immutable';
import {
  GUESTS_FETCHED,
} from '../../actions/wedding.actions';
import mapValues from 'lodash/fp/mapValues';
import Guest from '../../models/guest.model';

const wrapAll = mapValues((raw) => new Guest(raw));

export default function (guests = new Immutable.Map(), action) {
  switch (action.type) {
    case GUESTS_FETCHED:
      return guests.merge(wrapAll(action.guests));
    default:
      return guests;
  }
}
