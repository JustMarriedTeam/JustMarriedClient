import Immutable from 'immutable';

export default function (users = new Immutable.Map(), action) {
  switch (action.type) {
    default:
      return users;
  }
}
