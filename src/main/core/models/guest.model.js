import Immutable from 'immutable';

const GuestRecord = new Immutable.Record({
  id: '',
  firstName: '',
  lastName: '',
});

class Guest extends GuestRecord {

}

export default Guest;
