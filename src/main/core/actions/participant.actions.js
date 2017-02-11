export const PARTICIPANTS_FETCHED = 'PARTICIPANTS_FETCHED';
export const PARTICIPANT_UPDATED = 'PARTICIPANT_UPDATED';
export const PARTICIPANT_TOGGLED = 'PARTICIPANT_TOGGLED';

export const updateParticipant = (participant) => ({ type: PARTICIPANT_UPDATED, participant });
export const toggleParticipant = (participant) => ({ type: PARTICIPANT_TOGGLED, participant });
