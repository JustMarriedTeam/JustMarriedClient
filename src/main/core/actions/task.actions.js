import { sendingRequest, notifyRequestFailed } from './server.actions';
import { getTasks, putTask } from '../api/tasks.api';

export const TASKS_FETCHED = 'TASKS_FETCHED';

const fetchTasks = (query) => (dispatch) => {
  dispatch(sendingRequest(true));
  return getTasks(query)
    .then((tasks) => dispatch(({ type: TASKS_FETCHED, tasks })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

const updateTask = (task) => (dispatch) => {
  dispatch(sendingRequest(true));
  return putTask(task)
    .then(() => fetchTasks()(dispatch))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

export { fetchTasks, updateTask };

