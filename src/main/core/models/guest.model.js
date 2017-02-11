import Immutable from 'immutable';

const GuestRecord = new Immutable.Record({
  id: String,
  firstName: String,
  lastName: String,
});

class Guest extends GuestRecord {

}

export default Guest;
