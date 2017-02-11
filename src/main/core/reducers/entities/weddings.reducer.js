import Immutable from 'immutable';
import {
  WEDDINGS_FETCHED } from '../../actions/wedding.actions';
import mapValues from 'lodash/fp/mapValues';
import Wedding from '../../models/wedding.model';

const wrapAll = mapValues((raw) => new Wedding(raw));

export default (weddings = new Immutable.Map(), action) => {
  switch (action.type) {
    case WEDDINGS_FETCHED:
      return weddings.merge(wrapAll(action.weddings));
    default:
      return weddings;
  }
};
