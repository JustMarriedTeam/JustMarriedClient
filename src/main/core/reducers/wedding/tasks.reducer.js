import Immutable from 'immutable';
import {
  TASKS_LOADED,
} from '../../actions/wedding.actions';

export default function (tasks = new Immutable.Map(), action) {
  switch (action.type) {
    case TASKS_LOADED:
      return tasks.set(action.task.id, action.task);
    default:
      return tasks;
  }
}
