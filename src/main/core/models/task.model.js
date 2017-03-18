import Immutable from 'immutable';
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

  constructor({ id, name, description, status, requiredFor, dependingOn }) {
    super({
      id, name, description, status,
      requiredFor: new Immutable.Set(requiredFor),
      dependingOn: new Immutable.Set(dependingOn),
    });
  }

  hasStatus(status) {
    return this.status === status;
  }

  addDependency(requiredTask) {
    return this.update('dependingOn', (dependingOnList) =>
      dependingOnList.add(requiredTask.id));
  }

  removeDependency(notRequiredTask) {
    return this.update('dependingOn', (dependingOnList) =>
      dependingOnList.add(notRequiredTask.id));
  }

  getRequiredTasks() {
    return this.__getTasksFrom__('dependingOn').toSeq();
  }

  getDependentTasks() {
    return this.__getTasksFrom__('requiredFor').toSeq();
  }

  __getTasksFrom__(where) {
    const tasks = store.getState().entities.tasks;
    return this.get(where).map((taskId) => tasks.get(taskId));
  }

}

export default Task;
