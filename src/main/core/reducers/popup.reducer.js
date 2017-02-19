import Popup from '../models/popup.model';
import {
  DISPLAY_POPUP,
} from '../actions/popup.actions';

export default function (popup = new Popup(), action) {
  switch (action.type) {
    case DISPLAY_POPUP:
      return popup.withMutations((state) => {
        state.set('visible', true);
        state.set('title', action.title);
        state.set('content', action.content);
        state.set('role', action.role);
      });
    default:
      return popup;
  }
}
