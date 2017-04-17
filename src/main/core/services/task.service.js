import store from '../store';
import isUndefined from 'lodash/isUndefined';
import Immutable from 'immutable';

export const selectTasksRequiredFor = (allTasks, selectedTask) =>
  selectedTask.dependingOn.map((taskId) => allTasks.get(taskId)).filterNot(isUndefined).toSeq();

export const selectTasksDependingOn = (allTasks, selectedTask) =>
  selectedTask.requiredFor.map((taskId) => allTasks.get(taskId)).filterNot(isUndefined).toSeq();

export const selectTasksExplicitlyRequiredFor = (selectedTask) => {
  const state = store.getState();
  const allTasks = state.entities.tasks.merge(state.templates.tasks);
  return selectTasksRequiredFor(allTasks, selectedTask).toSeq();
};

export const selectTasksImplicitlyRequiredFor = (selectedTask) => {
  const tasksRequiredFor = selectTasksExplicitlyRequiredFor(selectedTask).toSet();
  const tasksRequiredForRequiredTasks = tasksRequiredFor.map((task) =>
    selectTasksImplicitlyRequiredFor(task));
  return tasksRequiredFor.union(tasksRequiredForRequiredTasks.flatten(true));
};

export const selectTasksNotRequiredForAnyOtherThanAmong = (selectedTask, allTasks) => {
  const otherTasks = new Immutable.Map(allTasks.remove(selectedTask)
    .map((task) => [task.id, task]));
  return selectTasksImplicitlyRequiredFor(selectedTask)
    .filter((task) => selectTasksDependingOn(otherTasks, task).isEmpty());
};
