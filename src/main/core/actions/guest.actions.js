import { getGuest } from '../api/guests.api';
import { sendingRequest, notifyRequestFailed } from './server.actions';

export const GUEST_LOADED = 'GUEST_LOADED';

export const loadGuest = (guestId) => (dispatch) => {
  dispatch(sendingRequest(true));
  return getGuest(guestId)
    .then((guest) => dispatch(({ type: GUEST_LOADED, guest })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};
