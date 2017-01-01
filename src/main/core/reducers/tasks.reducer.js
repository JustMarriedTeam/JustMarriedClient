import { TASKS_LOADED } from '../actions/tasks.actions';
import TaskCollection from '../models/task.collection.model';

export default function (tasks = new TaskCollection(), action) {
  switch (action.type) {
    case TASKS_LOADED:
      return tasks.set('tasks', action.tasks);
    default:
      return tasks;
  }
}
