import Immutable from 'immutable';

const NotificationRecord = new Immutable.Record({
  visible: false,
  message: '',
});

class Notification extends NotificationRecord {

}

export default Notification;
