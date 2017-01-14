import Immutable from 'immutable';
import difference from 'lodash/difference';

const WeddingRecord = new Immutable.Record({
  guests: [],
});

class Wedding extends WeddingRecord {

  removeGuests(guestsToRemove) {
    return this.set('guests', difference(this.guests, guestsToRemove));
  }

}

export default Wedding;
