import { USER_UPDATED } from './users.actions';
import { normalizeParticipant } from '../normalization/wedding.normalizer';
import merge from 'lodash/merge';
import set from 'lodash/set';

export const PARTICIPANTS_FETCHED = 'PARTICIPANTS_FETCHED';
export const PARTICIPANT_UPDATED = 'PARTICIPANT_UPDATED';
export const PARTICIPANT_TOGGLED = 'PARTICIPANT_TOGGLED';

export const updateParticipant = (participant) => (dispatch) => {
  const updatedParticipant = merge(set({}, 'user.id', participant.id), participant);
  const { participants, users } = normalizeParticipant(updatedParticipant).entities;

  dispatch({
    type: PARTICIPANT_UPDATED,
    participant: participants[updatedParticipant.id],
  });

  dispatch({
    type: USER_UPDATED,
    user: users[updatedParticipant.user.id],
  });
};

export const toggleParticipant = (participant) => ({ type: PARTICIPANT_TOGGLED, participant });
