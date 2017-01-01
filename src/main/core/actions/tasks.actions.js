import { getTasks } from '../api/tasks.api';
import { sendingRequest, notifyRequestFailed } from './server.actions';

export const TASKS_LOADED = 'TASKS_LOADED';

export const loadTasks = (query) => (dispatch) => {
  dispatch(sendingRequest(true));
  return getTasks(query)
    .then((tasks) => dispatch(({ type: TASKS_LOADED, tasks })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};
