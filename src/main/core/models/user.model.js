import Immutable from 'immutable';

const UserRecord = new Immutable.Record({
  id: '',
  firstName: '',
  lastName: '',
  contactEmail: '',
});

class User extends UserRecord {

}

export default User;
