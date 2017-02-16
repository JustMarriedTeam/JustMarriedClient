import Immutable from 'immutable';
import {
  USERS_FETCHED,
} from '../../actions/wedding.actions';
import {
  USER_UPDATED,
} from '../../actions/users.actions';
import mapValues from 'lodash/fp/mapValues';
import User from '../../models/user.model';
import cloneDeep from 'lodash/cloneDeep';

const wrapAll = mapValues((raw) => new User(raw));

export default function (users = new Immutable.Map(), action) {
  switch (action.type) {
    case USERS_FETCHED:
      return users.merge(wrapAll(action.users));
    case USER_UPDATED:
      return users.setIn([action.user.id],
        new User(cloneDeep(action.user)));
    default:
      return users;
  }
}
