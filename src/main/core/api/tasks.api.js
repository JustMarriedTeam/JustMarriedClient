import Promise from 'bluebird';
import server from '../server';

function getTasks(query) {
  return Promise.resolve(server.get('/wedding/tasks', {
    ...query,
  })).then((response) => response.data);
}

export { getTasks };
