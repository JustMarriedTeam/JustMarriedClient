import uniqueId from 'lodash/uniqueId';
import Task from '../models/task.model';

const createTask = () => (new Task({
  id: uniqueId('#task_'),
}));

export { createTask };
