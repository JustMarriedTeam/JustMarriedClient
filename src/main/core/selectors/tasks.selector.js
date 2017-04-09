import { createSelector } from 'reselect';
import Timeline from '../models/timeline.model';

export const selectTasks = state => state.entities.tasks.toList();

export const selectTasksById = state => state.entities.tasks;

export const selectTasksAsSeq = state => state.entities.tasks.toSetSeq();


export const selectTasksRequiredFor = (selectedTask) => createSelector(
  [selectTasksById],
  (tasksByKey) => selectedTask.dependingOn.map((taskId) => tasksByKey.get(taskId)).toSeq()
);

export const selectTasksDependingOn = (selectedTask) => createSelector(
  [selectTasksById],
  (tasksByKey) => selectedTask.requiredFor.map((taskId) => tasksByKey.get(taskId)).toSeq()
);

export const selectTasksUnrelatedTo = (task) => createSelector(
  [selectTasksAsSeq],
  (allTasksSeq) => {
    const requiredForIds = task.requiredFor;
    const dependingOnIds = task.dependingOn;
    const relatedTasksIds = requiredForIds.union(dependingOnIds);
    return allTasksSeq.filterNot((filteredTask) => relatedTasksIds.contains(filteredTask.id));
  }
);

export const selectTimeline = createSelector([selectTasks], (tasks) => new Timeline({ tasks }));
