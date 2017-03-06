import Immutable from 'immutable';

const TaskRecord = new Immutable.Record({
  id: '',
  name: '',
  description: '',
  status: '',
});

class Task extends TaskRecord {

}

export default Task;
