import Immutable from 'immutable';

const WeddingRecord = new Immutable.Record({
  id: '',
  participants: [],
  guests: [],
  tasks: [],
  owners: [],
});

/**
 * A wrapper for convenient access to wedding.
 * Reads properties from state entities.
 */
class Wedding extends WeddingRecord {

}

export default Wedding;
