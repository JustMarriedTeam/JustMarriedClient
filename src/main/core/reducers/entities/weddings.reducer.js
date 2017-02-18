import Immutable from 'immutable';
import {
  WEDDINGS_FETCHED,
} from '../../actions/wedding.actions';
import {
  ADD_GUEST,
} from '../../actions/guests.actions';
import mapValues from 'lodash/fp/mapValues';
import Wedding from '../../models/wedding.model';
import Guest from '../../models/guest.model';
import union from 'lodash/union';

const wrapAll = mapValues((raw) => new Wedding(raw));

export default (weddings = new Immutable.Map(), action) => {
  switch (action.type) {
    case WEDDINGS_FETCHED:
      return weddings.merge(wrapAll(action.weddings));
    case ADD_GUEST:
      const addedGuest = new Guest(action.guest);
      return weddings.updateIn([action.weddingId, 'guests'],
        arr => union(arr, [addedGuest.id])
      );
    default:
      return weddings;
  }
};
