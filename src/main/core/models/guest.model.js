import Immutable from 'immutable';

const GuestRecord = new Immutable.Record({
  firstName: null,
  lastName: null,
});

class Guest extends GuestRecord {

}

export default Guest;
