import Immutable from 'immutable';
import { WEDDING_FETCHED, WEDDING_SAVED } from '../actions/wedding.actions';

export default (wedding = new Immutable.Map(), action) => {
  switch (action.type) {
    case WEDDING_FETCHED:
    case WEDDING_SAVED:
      return wedding.set('id', action.id);
    default:
      return wedding;
  }
};
