import Promise from 'bluebird';
import server from '../server';
import store from '../store';
import { normalizeWedding, denormalizeWedding } from '../normalization/wedding.normalizer';

function getWedding(query) {
  return Promise.resolve(server.get('/wedding', {
    ...query,
  })).then((response) => normalizeWedding(response.data));
}

function putWedding(weddingToPost) {
  const wedding = store.getState().wedding;
  return Promise.resolve(server.put('/wedding', denormalizeWedding(wedding, weddingToPost)))
    .then((response) => normalizeWedding(response.data));
}

function postWedding(weddingToPost) {
  const wedding = store.getState().wedding;
  return Promise.resolve(server.post('/wedding', denormalizeWedding(wedding, weddingToPost)))
    .then((response) => normalizeWedding(response.data));
}

export { getWedding, postWedding, putWedding };
