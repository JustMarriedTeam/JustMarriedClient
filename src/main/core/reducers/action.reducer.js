import { EDITING_STARTED, EDITING_SUCCEEDED } from '../actions/editing.actions';
import {
  SELECTING_STARTED,
  SELECTING_ENDED,
  ENABLE_SELECTING,
  DISABLE_SELECTING,
} from '../actions/selection.actions';
import Action from '../models/action.model';

export default function (action = new Action(), actionTriggered) {
  switch (actionTriggered.type) {
    case EDITING_STARTED:
      return action.set('editing', true);
    case EDITING_SUCCEEDED:
      return action.set('editing', false);
    case ENABLE_SELECTING:
      return action.set('canSelect', true);
    case DISABLE_SELECTING:
      return action.set('canSelect', false);
    case SELECTING_STARTED:
      return action.set('selecting', true);
    case SELECTING_ENDED:
      return action.set('selecting', false);
    default:
      return action;
  }
}
