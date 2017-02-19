import { POPUP_ROLE } from '../models/popup.model';

export const DISPLAY_POPUP = 'DISPLAY_POPUP';
export const POPUP_CONFIRMED = 'POPUP_CONFIRMED';

export const confirmPopup = () => ({ type: POPUP_CONFIRMED });

export const displayAcknowledgePopup = ({ title, content }) => ({
  type: DISPLAY_POPUP,
  role: POPUP_ROLE.ACKNOWLEDGE,
  title,
  content,
});
