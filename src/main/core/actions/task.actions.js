import { sendingRequest, notifyRequestFailed } from './server.actions';
import { getTasks, putTask } from '../api/tasks.api';

export const TASKS_FETCHED = 'TASKS_FETCHED';

export const fetchTasks = (query) => (dispatch) => {
  dispatch(sendingRequest(true));
  return getTasks(query)
    .then((tasks) => dispatch(({ type: TASKS_FETCHED, tasks })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

export const updateTask = (task) => (dispatch) => {
  dispatch(sendingRequest(true));
  return putTask(task)
    .then(fetchTasks())
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};
