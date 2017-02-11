import Immutable from 'immutable';

const UserRecord = new Immutable.Record({
  id: String,
  username: String,
  firstName: String,
  lastName: String,
});

class User extends UserRecord {

}

export default User;
