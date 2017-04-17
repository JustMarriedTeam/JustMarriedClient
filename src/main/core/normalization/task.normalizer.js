import { normalize, denormalize } from 'normalizr';
import { taskSchema, taskListSchema } from './schema';

export const normalizeTask = (data) => normalize(data, taskSchema);
export const denormalizeTask = (task, entities) =>
  denormalize(task, taskSchema, entities);

export const normalizeTaskList = (data) => normalize(data, taskListSchema);
export const denormalizeTaskList = (tasks, entities) =>
  denormalize({ tasks }, { tasks: [taskSchema] }, entities).tasks;
