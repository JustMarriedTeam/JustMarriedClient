import Popup from '../models/popup.model';
import {
  DISPLAY_POPUP,
  POPUP_CONFIRMED,
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
    case POPUP_CONFIRMED:
      return popup.withMutations((state) => {
        state.set('visible', false);
        state.delete('title');
        state.delete('content');
        state.delete('role');
      });
    default:
      return popup;
  }
}
