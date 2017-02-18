import { createSelector } from 'reselect';
import Wedding from '../models/wedding.model';

const NULL_WEDDING = new Wedding();

const weddingEntitiesSelector = state => state.entities.weddings;
const selectCurrentWeddingId = state => state.wedding.get('id');

const selectWedding = createSelector(
  [weddingEntitiesSelector, selectCurrentWeddingId],
  (weddings, currentWeddingId) => weddings.get(currentWeddingId) || NULL_WEDDING
);

export { selectWedding, selectCurrentWeddingId };

