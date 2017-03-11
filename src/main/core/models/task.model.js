import Immutable from 'immutable';

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

}

export default Task;
