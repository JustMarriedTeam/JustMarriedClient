import { getWedding, postWedding } from '../api/wedding.api';
import { sendingRequest, notifyRequestFailed } from './server.actions';

export const WEDDING_FETCHED = 'WEDDING_FETCHED';
export const WEDDING_SAVED = 'WEDDING_SAVED';
export const ADD_GUEST = 'ADD_GUEST';
export const UPDATE_GUEST = 'UPDATE_GUEST';
export const REMOVE_GUESTS = 'GUESTS_REMOVED';

export const addGuest = (guest) => ({ type: ADD_GUEST, guest });
export const updateGuest = (guest) => ({ type: UPDATE_GUEST, guest });
export const removeGuests = (guestsToRemove) => ({ type: REMOVE_GUESTS, guests: guestsToRemove });

export const fetchWedding = (query) => (dispatch) => {
  dispatch(sendingRequest(true));
  return getWedding(query)
    .then((wedding) => dispatch(({ type: WEDDING_FETCHED, wedding })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

export const saveWedding = (savedWedding) => (dispatch) => {
  dispatch(sendingRequest(true));
  return postWedding(savedWedding)
    .then((wedding) => dispatch(({ type: WEDDING_SAVED, wedding })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};
