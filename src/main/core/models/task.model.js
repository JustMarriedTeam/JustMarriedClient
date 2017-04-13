import Immutable from 'immutable';
import store from '../store';
import moment from 'moment';

export const TASK_STATUS = {
  PENDING: 'pending',
  BLOCKED: 'blocked',
  DONE: 'done',
};

const TaskRecord = new Immutable.Record({
  id: '',
  name: '',
  description: '',
  status: '',
  requiredFor: [],
  dependingOn: [],
  deadlineDate: null,
  completionDate: null,
});

class Task extends TaskRecord {

  constructor({ id, name, description, status, requiredFor,
    dependingOn, deadlineDate, completionDate }) {
    super({
      id, name, description, status,
      requiredFor: new Immutable.Set(requiredFor),
      dependingOn: new Immutable.Set(dependingOn),
      deadlineDate: deadlineDate ? moment(deadlineDate) : null,
      completionDate: completionDate ? moment(completionDate) : null,
    });
  }

  hasStatus(status) {
    return this.status === status;
  }

  setStatus(newStatus) {
    return this.set('status', newStatus);
  }

  addDependency(requiredTask) {
    return this.update('dependingOn', (dependingOnList) =>
      dependingOnList.add(requiredTask.id));
  }

  removeDependency(notRequiredTask) {
    return this.update('dependingOn', (dependingOnList) =>
      dependingOnList.remove(notRequiredTask.id));
  }

  addRequirement(dependentTask) {
    return this.update('requiredFor', (requiredForList) =>
      requiredForList.add(dependentTask.id));
  }

  removeRequirement(notDependentTask) {
    return this.update('requiredFor', (requiredForList) =>
      requiredForList.remove(notDependentTask.id));
  }

  /**
   * @Deprecated As tasks are not only stored in entities but also templates
   */
  getRequiredTasks() {
    return this.__getTasksFrom__('dependingOn').toSeq();
  }

  /**
   * @Deprecated As tasks are not only stored in entities but also templates
   */
  getDependentTasks() {
    return this.__getTasksFrom__('requiredFor').toSeq();
  }

  /**
   * @Deprecated As tasks are not only stored in entities but also templates
   */
  __getTasksFrom__(where) {
    const tasks = store.getState().entities.tasks;
    return this.get(where).map((taskId) => tasks.get(taskId));
  }

}

export default Task;
