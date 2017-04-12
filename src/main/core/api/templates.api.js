import Promise from 'bluebird';
import server from '../server';

function getTemplateTasks() {
  return Promise.resolve(server.get('/templates/tasks'))
    .then((response) => response.data);
}

export { getTemplateTasks };
