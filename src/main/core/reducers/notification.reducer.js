import Notification from '../models/notification.model';
import {
  ERROR_NOTIFICATION_SHOWN,
  NOTIFICATION_CLEARED,
} from '../actions/notification.actions';

export default function (notification = new Notification(), action) {
  switch (action.type) {
    case ERROR_NOTIFICATION_SHOWN:
      return notification.withMutations((state) => {
        state.set('visible', true);
        state.set('message', action.message);
      });
    case NOTIFICATION_CLEARED:
      return notification.withMutations((state) => {
        state.set('visible', false);
        state.set('message', '');
      });
    default:
      return notification;
  }
}
