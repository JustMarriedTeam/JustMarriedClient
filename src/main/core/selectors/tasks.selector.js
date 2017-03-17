const tasksEntitiesSelector = state => state.entities.tasks.toList();

export const selectTasks = tasksEntitiesSelector;

export const selectTask = (selectedTaskId) => state => state.entities.tasks.get(selectedTaskId);

export const selectTasksRequiredFor = (selectedTaskId) => state =>
  state.entities.tasks.filter((task) => task.requiredFor.includes(selectedTaskId)).toList();

export const selectTasksDependingOn = (selectedTaskId) => state =>
  state.entities.tasks.filter((task) => task.dependingOn.includes(selectedTaskId)).toList();

export const selectAllTasks = state =>
  state.entities.tasks.toList();
