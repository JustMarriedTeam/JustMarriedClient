import { USER_UPDATED } from './users.actions';
import { normalizeParticipant } from '../normalization/wedding.normalizer';

export const PARTICIPANTS_FETCHED = 'PARTICIPANTS_FETCHED';
export const PARTICIPANT_UPDATED = 'PARTICIPANT_UPDATED';
export const PARTICIPANT_TOGGLED = 'PARTICIPANT_TOGGLED';

export const updateParticipant = (participant) => (dispatch) => {
  const { participants, users } = normalizeParticipant(participant).entities;

  dispatch({
    type: PARTICIPANT_UPDATED,
    participant: participants[participant.id],
  });

  dispatch({
    type: USER_UPDATED,
    user: users[participant.user.id],
  });
};


export const toggleParticipant = (participant) => ({ type: PARTICIPANT_TOGGLED, participant });
