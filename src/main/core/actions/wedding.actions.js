import { getGuests } from '../api/guests.api';
import { sendingRequest, notifyRequestFailed } from './server.actions';

export const GUESTS_FETCHED = 'GUESTS_FETCHED';
export const ADD_GUEST = 'ADD_GUEST';
export const REMOVE_GUESTS = 'GUESTS_REMOVED';

export const addGuest = (guest) => ({ type: ADD_GUEST, guest });
export const removeGuests = (guestsToRemove) => ({ type: REMOVE_GUESTS, guests: guestsToRemove });

export const fetchGuests = (query) => (dispatch) => {
  dispatch(sendingRequest(true));
  return getGuests(query)
    .then((guests) => dispatch(({ type: GUESTS_FETCHED, guests })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};
