import { createSelector } from 'reselect';

const weddingEntitiesSelector = state => state.entities.weddings;
const weddingSelector = state => state.wedding;

const selectWedding = createSelector(
  [weddingEntitiesSelector, weddingSelector],
  (weddings, wedding) => weddings[wedding.get('id')]
);

export { selectWedding };

