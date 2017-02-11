import { WEDDING_FETCHED, WEDDING_SAVED } from '../actions/wedding.actions';
import Immutable from 'immutable';

export default (wedding = new Immutable.Map(), action) => {
  switch (action.type) {
    case WEDDING_FETCHED:
    case WEDDING_SAVED:
      return wedding.set('id', action.id);
    default:
      return wedding;
  }
};
