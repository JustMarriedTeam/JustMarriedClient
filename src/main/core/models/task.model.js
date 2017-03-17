import Immutable from 'immutable';
import concat from 'lodash/concat';

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

  hasStatus(status) {
    return this.status === status;
  }

  addDependency(requiredTask) {
    return this.update('dependingOn', (dependingOnList) =>
      concat(dependingOnList, [requiredTask.id]));
  }

}

export default Task;
