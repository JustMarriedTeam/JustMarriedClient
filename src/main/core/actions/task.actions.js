import { sendingRequest, notifyRequestFailed } from './server.actions';
import { getTasks, postTask, putTask, deleteTask } from '../api/tasks.api';
import { normalizeTaskList, denormalizeTask } from '../normalization/task.normalizer';
import store from '../store';

export const TASKS_FETCHED = 'TASKS_FETCHED';

const getDenormalizedTask = (task) => denormalizeTask(task, store.getState().entities);
const getNormalizedTaskList = (tasks) => normalizeTaskList(tasks);

const fetchTasks = (query) => (dispatch) => {
  dispatch(sendingRequest(true));
  return getTasks(query)
    .then(getNormalizedTaskList)
    .then((normalizedTasks) => dispatch(({
      type: TASKS_FETCHED,
      tasks: normalizedTasks.entities.tasks,
    })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

const updateTask = (task) => (dispatch) => {
  dispatch(sendingRequest(true));
  return putTask(getDenormalizedTask(task))
    .then(() => fetchTasks()(dispatch))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

const changeStatus = (task, status) => (dispatch) =>
  updateTask(task.setStatus(status))(dispatch);

const removeTask = (task) => (dispatch) => {
  dispatch(sendingRequest(true));
  return deleteTask(task.id)
    .then(() => fetchTasks()(dispatch))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

const createTask = (task) => (dispatch) => {
  dispatch(sendingRequest(true));
  return postTask(getDenormalizedTask(task))
    .then(() => fetchTasks()(dispatch))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

export {
  fetchTasks,
  createTask,
  updateTask,
  changeStatus,
  removeTask,
};

