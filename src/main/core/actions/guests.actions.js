export const GUESTS_FETCHED = 'GUESTS_FETCHED';
export const ADD_GUEST = 'ADD_GUEST';
export const UPDATE_GUEST = 'UPDATE_GUEST';
export const REMOVE_GUESTS = 'GUESTS_REMOVED';

export const addGuest = ({ guest, weddingId }) => ({ type: ADD_GUEST, weddingId, guest });
export const updateGuest = ({ guest, weddingId }) => ({ type: UPDATE_GUEST, weddingId, guest });
export const removeGuests = ({ guests, weddingId }) =>
  ({ type: REMOVE_GUESTS, weddingId, guests });
