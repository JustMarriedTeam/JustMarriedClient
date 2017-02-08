import { EDITING_STARTED, EDITING_SUCCEEDED } from '../actions/editing.actions';
import Action from '../models/action.model';

export default function (action = new Action(), actionTriggered) {
  switch (actionTriggered.type) {
    case EDITING_STARTED:
      return action.set('editing', true);
    case EDITING_SUCCEEDED:
      return action.set('editing', false);
    default:
      return action;
  }
}
