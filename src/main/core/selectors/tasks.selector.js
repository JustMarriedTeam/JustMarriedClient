const tasksEntitiesSelector = state => state.entities.tasks.toSetSeq();

export const selectTasks = tasksEntitiesSelector;
