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

function postTask(task) {
  return Promise.resolve(server.post('/wedding/tasks', task))
    .then((response) => response.data);
}

function deleteTask(taskId) {
  return Promise.resolve(server.delete(`/wedding/tasks/${taskId}`));
}

export { getTasks, postTask, putTask, deleteTask };
