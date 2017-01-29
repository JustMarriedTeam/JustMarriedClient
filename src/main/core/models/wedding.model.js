import Immutable from 'immutable';
import difference from 'lodash/difference';
import concat from 'lodash/concat';
import find from 'lodash/find';
import merge from 'lodash/merge';

const WeddingRecord = new Immutable.Record({
  guests: [],
  participants: {},
});

class Wedding extends WeddingRecord {

  addGuest(guest) {
    return this.set('guests', concat(this.guests, [guest]));
  }

  updateGuest(updatedGuest) {
    const allGuests = this.get('guests');
    const guestToUpdate = find(allGuests, { id: updatedGuest.id });
    merge(guestToUpdate, updatedGuest);
    return this.set('guests', allGuests);
  }

  removeGuests(guestsToRemove) {
    return this.set('guests', difference(this.guests, guestsToRemove));
  }

  updateParticipant(updatedParticipant) {
    const participantsByRole = this.get('participants');
    const oldParticipant = participantsByRole[updatedParticipant.role];
    merge(oldParticipant, updatedParticipant);
    return this.set('participants', participantsByRole);
  }

}

export default Wedding;
