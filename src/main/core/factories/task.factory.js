import uniqueId from 'lodash/uniqueId';
import Task from '../models/task.model';

const createTask = () => (new Task({
  id: uniqueId('#task_'),
}));

const createNullTask = () => (new Task({
  id: uniqueId('#task_'),
  name: '',
}));

export { createTask, createNullTask };
