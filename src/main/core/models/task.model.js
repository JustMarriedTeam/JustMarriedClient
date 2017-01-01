import Immutable from 'immutable';

const TaskRecord = new Immutable.Record({
  isAwaitingResponse: false,
});

class Task extends TaskRecord {

}

export default Task;
