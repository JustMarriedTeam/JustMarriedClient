import Immutable from 'immutable';
import {
  TASKS_FETCHED,
} from '../../actions/wedding.actions';
import mapValues from 'lodash/fp/mapValues';
import keyBy from 'lodash/fp/keyBy';
import Task from '../../models/task.model';
import {
  MAKE_TASK_DEPEND_ON,
} from '../../actions/task.actions';

const wrapAll = (tasks) => keyBy((task) => task.id)(mapValues((raw) => new Task(raw))(tasks));

export default function (tasks = new Immutable.Map(), action) {
  switch (action.type) {
    case TASKS_FETCHED:
      const wrappedTasks = wrapAll(action.tasks);
      return new Immutable.Map(wrappedTasks);
    case MAKE_TASK_DEPEND_ON:
      return tasks.update(action.task.id, (task) =>
        task.addDependency(action.requiredTask));
    default:
      return tasks;
  }
}
