import Immutable from 'immutable';
import {
  USERS_FETCHED,
} from '../../actions/wedding.actions';
import mapValues from 'lodash/fp/mapValues';
import User from '../../models/user.model';

const wrapAll = mapValues((raw) => new User(raw));

export default function (users = new Immutable.Map(), action) {
  switch (action.type) {
    case USERS_FETCHED:
      return users.merge(wrapAll(action.users));
    default:
      return users;
  }
}
