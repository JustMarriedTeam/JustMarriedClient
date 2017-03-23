import Immutable from 'immutable';
import { TASKS_FETCHED } from '../../actions/task.actions';
import mapValues from 'lodash/fp/mapValues';
import keyBy from 'lodash/fp/keyBy';
import Task from '../../models/task.model';

const wrapAll = (tasks) => keyBy((task) => task.id)(mapValues((raw) => new Task(raw))(tasks));

export default function (tasks = new Immutable.Map(), action) {
  switch (action.type) {
    case TASKS_FETCHED: {
      const wrappedTasks = wrapAll(action.tasks);
      return new Immutable.Map(wrappedTasks);
    }
    default:
      return tasks;
  }
}
