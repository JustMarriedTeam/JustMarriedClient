import Alert, { ALERT_TYPE } from '../models/alert.model';
import {
  SUCCESS_ALERT_SHOWN,
  ERROR_ALERT_SHOWN,
  ALERT_CLEARED,
} from '../actions/alert.actions';

export default function (alert = new Alert(), action) {
  switch (action.type) {
    case SUCCESS_ALERT_SHOWN:
      return alert.withMutations((state) => {
        state.set('visible', true);
        state.set('message', action.message);
        state.set('type', ALERT_TYPE.SUCCESS);
      });
    case ERROR_ALERT_SHOWN:
      return alert.withMutations((state) => {
        state.set('visible', true);
        state.set('message', action.message);
        state.set('type', ALERT_TYPE.ERROR);
      });
    case ALERT_CLEARED:
      return alert.withMutations((state) => {
        state.set('visible', false);
        state.set('message', '');
        state.set('type', null);
      });
    default:
      return alert;
  }
}
