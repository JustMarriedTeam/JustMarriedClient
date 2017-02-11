import Immutable from 'immutable';
import {
  PARTICIPANTS_FETCHED,
} from '../../actions/wedding.actions';
import mapValues from 'lodash/fp/mapValues';
import Participant from '../../models/participant.model';

const wrapAll = mapValues((raw) => new Participant(raw));

export default function (participants = new Immutable.Map(), action) {
  switch (action.type) {
    case PARTICIPANTS_FETCHED:
      return participants.merge(wrapAll(action.participants));
    default:
      return participants;
  }
}
