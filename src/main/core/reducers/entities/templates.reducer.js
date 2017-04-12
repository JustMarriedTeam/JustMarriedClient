import Immutable from 'immutable';
import { TEMPLATE_TASKS_FETCHED } from '../../actions/templates.actions';
import mapValues from 'lodash/fp/mapValues';
import keyBy from 'lodash/fp/keyBy';
import Task from '../../models/task.model';

const wrapAll = (tasks) => keyBy((task) => task.id)(mapValues((raw) => new Task(raw))(tasks));

function taskTemplatesReducer(taskTemplates = new Immutable.Map(), action) {
  switch (action.type) {
    case TEMPLATE_TASKS_FETCHED: {
      const wrappedTasks = wrapAll(action.tasks);
      return new Immutable.Map(wrappedTasks);
    }
    default:
      return taskTemplates;
  }
}


export {
  taskTemplatesReducer,
};
