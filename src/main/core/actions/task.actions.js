export const MAKE_TASK_DEPEND_ON = 'MAKE_TASK_DEPEND_ON';
export const MAKE_TASK_INDEPENDENT_OF = 'MAKE_TASK_INDEPENDENT_OF';

export const makeTaskDependOn = (task, requiredTask) =>
  ({ type: MAKE_TASK_DEPEND_ON, task, requiredTask });
export const makeTaskIndependentOf = (task, notRequiredTask) =>
  ({ type: MAKE_TASK_INDEPENDENT_OF, task, notRequiredTask });
