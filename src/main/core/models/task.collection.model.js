import Immutable from 'immutable';

const TaskCollectionRecord = new Immutable.Record({
  tasks: [],
});

class TaskCollection extends TaskCollectionRecord {

  getAll = () => this.get('tasks');

}

export default TaskCollection;
