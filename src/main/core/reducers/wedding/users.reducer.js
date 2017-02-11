import Immutable from 'immutable';
import {
  USERS_FETCHED,
} from '../../actions/wedding.actions';

export default function (users = new Immutable.Map(), action) {
  switch (action.type) {
    case USERS_FETCHED:
      return users.merge(action.users);
    default:
      return users;
  }
}
