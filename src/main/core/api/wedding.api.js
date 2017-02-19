import Promise from 'bluebird';
import server from '../server';
import store from '../store';
import Immutable from 'immutable';
import { normalizeWedding, denormalizeWedding } from '../normalization/wedding.normalizer';

function getWedding(query) {
  return Promise.resolve(server.get('/wedding', {
    ...query,
  })).then((response) => normalizeWedding(response.data));
}

function putWedding(weddingToPost) {
  const state = store.getState();
  const immutableEntities = new Immutable.Map(state.entities);
  const denormalizedWedding = denormalizeWedding(weddingToPost.toJS(), immutableEntities.toJS());
  return Promise.resolve(server.put('/wedding', denormalizedWedding))
    .then((response) => normalizeWedding(response.data));
}

function postWedding(weddingToPost) {
  return Promise.resolve(server.post('/wedding', weddingToPost.toJS()))
    .then((response) => normalizeWedding(response.data));
}

export { getWedding, postWedding, putWedding };
