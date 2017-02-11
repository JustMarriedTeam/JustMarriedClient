import Immutable from 'immutable';
import difference from 'lodash/difference';
import concat from 'lodash/concat';
import find from 'lodash/fp/find';
import merge from 'lodash/merge';
import remove from 'lodash/fp/remove';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import map from 'lodash/fp/map';

const WeddingRecord = new Immutable.Record({
  guests: new Immutable.List(),
  participants: new Immutable.List(),
  tasks: new Immutable.List(),
});

class Wedding extends WeddingRecord {

  constructor({ guests, participants, tasks } = { guests: [], participants: [], tasks: [] }) {
    super({
      guests: Immutable.List.of(...guests),
      participants: Immutable.List.of(...participants),
      tasks: Immutable.List.of(...tasks),
    });
  }

  getParticipants = () => this.get('participants');

  removeParticipant = (participant) => remove(participant)(this.getParticipants());

  findParticipantByRole = (role) => find({ role })(this.getParticipants());

  replaceParticipant = (oldParticipant, newParticipant) => this.set('participants',
    map((participant) => {
      if (participant === oldParticipant) {
        return newParticipant;
      }
      return participant;
    })(this.getParticipants()));

  addGuest = (guest) => this.set('guests', concat(this.guests, [guest]));

  updateGuest = (updatedGuest) => {
    const allGuests = this.get('guests');
    const guestToUpdate = find(allGuests, { id: updatedGuest.id });
    merge(guestToUpdate, updatedGuest);
    return this.set('guests', allGuests);
  };

  removeGuests = (guestsToRemove) => this.set('guests', difference(this.guests, guestsToRemove));

  updateParticipant = (updatedParticipant) => {
    const oldParticipant = this.findParticipantByRole(updatedParticipant.role);
    this.replaceParticipant(oldParticipant, cloneDeep(updatedParticipant));
    return this;
  };

  toggleParticipant = (toggledParticipant) => {
    const oldParticipant = this.findParticipantByRole(toggledParticipant.role);
    return this.replaceParticipant(oldParticipant, extend({}, oldParticipant, {
      active: !oldParticipant.active,
    }));
  }

}

export default Wedding;
