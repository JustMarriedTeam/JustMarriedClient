import { POPUP_ROLE } from '../models/popup.model';

export const DISPLAY_POPUP = 'DISPLAY_POPUP';

export const displayAcknowledgePopup = ({ title, content }) => ({
  type: DISPLAY_POPUP,
  role: POPUP_ROLE.ACKNOWLEDGE,
  title,
  content,
});
