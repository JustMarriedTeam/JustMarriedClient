import Promise from 'bluebird';
import server from '../server';

function getWedding(query) {
  return Promise.resolve(server.get('/wedding', {
    ...query,
  })).then((response) => response.data);
}

function postWedding(weddingToPost) {
  return Promise.resolve(weddingToPost).then(response => response);
}

export { getWedding, postWedding };
