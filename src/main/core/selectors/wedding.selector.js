import { createSelector } from 'reselect';
import Wedding from '../models/wedding.model';

const NULL_WEDDING = new Wedding();

const weddingEntitiesSelector = state => state.entities.weddings;
const weddingSelector = state => state.wedding;

const selectWedding = createSelector(
  [weddingEntitiesSelector, weddingSelector],
  (weddings, wedding) => weddings.get(wedding.get('id')) || NULL_WEDDING
);

export { selectWedding };

