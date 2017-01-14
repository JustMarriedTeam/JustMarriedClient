import Immutable from 'immutable';
import difference from 'lodash/difference';
import concat from 'lodash/concat';

const WeddingRecord = new Immutable.Record({
  guests: [],
});

class Wedding extends WeddingRecord {

  addGuest(guest) {
    return this.set('guests', concat(this.guests, [guest]));
  }

  removeGuests(guestsToRemove) {
    return this.set('guests', difference(this.guests, guestsToRemove));
  }

}

export default Wedding;
