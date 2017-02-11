import Immutable from 'immutable';
import { WEDDINGS_FETCHED } from '../../actions/wedding.actions';

export default (weddings = new Immutable.Map(), action) => {
  switch (action.type) {
    case WEDDINGS_FETCHED:
      return weddings.merge(action.weddings);
    default:
      return weddings;
  }
};
