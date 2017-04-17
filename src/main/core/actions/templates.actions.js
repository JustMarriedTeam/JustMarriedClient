import { sendingRequest, notifyRequestFailed } from './server.actions';
import { getTemplateTasks, postCloneTemplateTasks } from '../api/templates.api';
import store from '../store';
import { denormalizeTaskList } from '../normalization/task.normalizer';
import Immutable from 'immutable';
import { fetchTasks } from './task.actions';

export const TEMPLATE_TASKS_FETCHED = 'TEMPLATE_TASKS_FETCHED';
export const TEMPLATE_TASKS_CLONED = 'TEMPLATE_TASKS_CLONED';

const fetchTemplateTasks = () => (dispatch) => {
  dispatch(sendingRequest(true));
  return getTemplateTasks()
    .then((tasks) => dispatch(({ type: TEMPLATE_TASKS_FETCHED, tasks })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

const cloneTemplateTasks = (tasksToClone) => (dispatch) => {
  dispatch(sendingRequest(true));
  const templates = new Immutable.Map(store.getState().templates);
  return postCloneTemplateTasks(denormalizeTaskList(
    tasksToClone.map((task) => task.id).toArray(), templates.toJS()))
    .then((tasks) => dispatch(({ type: TEMPLATE_TASKS_CLONED, tasks })))
    .then(() => fetchTasks()(dispatch))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

export {
  fetchTemplateTasks,
  cloneTemplateTasks,
};
