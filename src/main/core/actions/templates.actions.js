import { sendingRequest, notifyRequestFailed } from './server.actions';
import { getTemplateTasks } from '../api/templates.api';

export const TEMPLATE_TASKS_FETCHED = 'TEMPLATE_TASKS_FETCHED';

const fetchTemplateTasks = () => (dispatch) => {
  dispatch(sendingRequest(true));
  return getTemplateTasks()
    .then((tasks) => dispatch(({ type: TEMPLATE_TASKS_FETCHED, tasks })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

export {
  fetchTemplateTasks,
};
