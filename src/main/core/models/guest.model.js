import Immutable from 'immutable';

const GuestRecord = new Immutable.Record({
  id: '',
  firstName: '',
  lastName: '',
  sex: '',
  contactEmail: '',
});

class Guest extends GuestRecord {

}

export default Guest;
