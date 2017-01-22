import Immutable from 'immutable';

const ActionRecord = new Immutable.Record({
  editing: false,
});

class Action extends ActionRecord {

}

export default Action;
