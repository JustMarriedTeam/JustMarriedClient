import Immutable from 'immutable';
import concat from 'lodash/concat';
import store from '../store';

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
});

class Task extends TaskRecord {

  constructor(values) {
    super(Immutable.fromJS(values));
  }

  hasStatus(status) {
    return this.status === status;
  }

  addDependency(requiredTask) {
    return this.update('dependingOn', (dependingOnList) =>
      concat(dependingOnList, [requiredTask.id]));
  }

  getRequiredTasks() {
    return this.__getTasksFrom__('dependingOn');
  }

  getDependentTasks() {
    return this.__getTasksFrom__('requiredFor');
  }

  __getTasksFrom__(where) {
    const tasks = store.getState().entities.tasks;
    return this.get(where).map((taskId) => tasks.get(taskId));
  }

}

export default Task;
