import Immutable from 'immutable';

const ALERT_TYPE = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  SUCCESS: 'SUCCESS',
};

const AlertRecord = new Immutable.Record({
  visible: false,
  message: '',
  type: null,
});

class Alert extends AlertRecord {

}

export { ALERT_TYPE };

export default Alert;
