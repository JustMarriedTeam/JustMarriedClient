import Immutable from 'immutable';
import {
  TASKS_FETCHED,
} from '../../actions/wedding.actions';

export default function (tasks = new Immutable.Map(), action) {
  switch (action.type) {
    case TASKS_FETCHED:
      return tasks.merge(action.tasks);
    default:
      return tasks;
  }
}
