import { createSelector } from 'reselect';
import { selectWedding } from './wedding.selector';

const participantEntitiesSelector = state => state.entities.participants;

const selectParticipants = createSelector(
  [selectWedding, participantEntitiesSelector],
  (wedding, participants) => wedding.participants.map((id) => participants.get(id))
);

export { selectParticipants };

