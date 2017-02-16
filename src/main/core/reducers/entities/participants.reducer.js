import Immutable from 'immutable';
import {
  PARTICIPANTS_FETCHED,
  PARTICIPANT_TOGGLED,
  PARTICIPANT_UPDATED,
} from '../../actions/participant.actions';
import mapValues from 'lodash/fp/mapValues';
import Participant from '../../models/participant.model';
import cloneDeep from 'lodash/cloneDeep';

const wrapAll = mapValues((raw) => new Participant(raw));

export default function (participants = new Immutable.Map(), action) {
  switch (action.type) {
    case PARTICIPANTS_FETCHED:
      return participants.merge(wrapAll(action.participants));
    case PARTICIPANT_TOGGLED:
      return participants.updateIn([action.participant.id], (participant) =>
        participant.set('active', !participant.active)
      );
    case PARTICIPANT_UPDATED:
      return participants.setIn([action.participant.id],
        new Participant(cloneDeep(action.participant)));
    default:
      return participants;
  }
}
