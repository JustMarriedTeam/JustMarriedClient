const tasksEntitiesSelector = state => state.entities.tasks.toList();

export const selectTasks = tasksEntitiesSelector;
