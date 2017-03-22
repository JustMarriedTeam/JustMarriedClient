import Promise from 'bluebird';
import server from '../server';

function getTasks(query) {
  return Promise.resolve(server.get('/wedding/tasks', {
    ...query,
  })).then((response) => response.data);
}

function putTask(task) {
  return Promise.resolve(server.put(`/wedding/tasks/${task.id}`, task))
    .then((response) => response.data);
}

export { getTasks, putTask };
