import { START_EDIT, END_EDIT } from '../actions/interface.actions';
import Action from '../models/action.model';

export default function (action = new Action(), actionTriggered) {
  switch (actionTriggered.type) {
    case START_EDIT:
      return action.set('editing', true);
    case END_EDIT:
      return action.set('editing', false);
    default:
      return action;
  }
}
