import { createSelector } from 'reselect';
import { selectWedding } from './wedding.selector';

const guestsEntitiesSelector = state => state.entities.guests;

const selectGuests = createSelector(
  [selectWedding, guestsEntitiesSelector],
  (wedding, guests) => wedding.guests.map((id) => guests.get(id))
);

const selectGuest = (id) => createSelector(
  [guestsEntitiesSelector],
  (guests) => guests.get(id)
);

export { selectGuests, selectGuest };

