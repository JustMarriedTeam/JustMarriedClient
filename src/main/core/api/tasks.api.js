import Promise from 'bluebird';
import server from '../server';

function getTasks(query) {
  return Promise.resolve(server.get('/tasks', {
    ...query,
  })).then(response => response.json());
}

export { getTasks };
