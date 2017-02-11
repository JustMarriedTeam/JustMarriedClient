import Promise from 'bluebird';
import server from '../server';
import store from '../store';
import pick from 'lodash/fp/pick';
import { normalizeWedding, denormalizeWedding } from '../normalization/wedding.normalizer';

const pickEntitiesFrom = pick('entities');

function getWedding(query) {
  return Promise.resolve(server.get('/wedding', {
    ...query,
  })).then((response) => normalizeWedding(response.data));
}

function putWedding(weddingToPost) {
  const state = store.getState();
  const weddingId = state.wedding.get('id');
  const denormalizedWedding = denormalizeWedding(pickEntitiesFrom(state), weddingToPost, weddingId);
  return Promise.resolve(server.put('/wedding', denormalizedWedding))
    .then((response) => normalizeWedding(response.data));
}

function postWedding(weddingToPost) {
  const wedding = store.getState().wedding;
  return Promise.resolve(server.post('/wedding', denormalizeWedding(wedding, weddingToPost)))
    .then((response) => normalizeWedding(response.data));
}

export { getWedding, postWedding, putWedding };
