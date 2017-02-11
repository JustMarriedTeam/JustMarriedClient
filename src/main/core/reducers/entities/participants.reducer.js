import Immutable from 'immutable';
import {
  PARTICIPANTS_FETCHED,
  PARTICIPANT_TOGGLED,
} from '../../actions/participant.actions';
import mapValues from 'lodash/fp/mapValues';
import Participant from '../../models/participant.model';

const wrapAll = mapValues((raw) => new Participant(raw));

export default function (participants = new Immutable.Map(), action) {
  switch (action.type) {
    case PARTICIPANTS_FETCHED:
      return participants.merge(wrapAll(action.participants));
    case PARTICIPANT_TOGGLED:
      return participants.updateIn(action.id, (participant) =>
        participant.set('active', !participant.active)
      );
    default:
      return participants;
  }
}
