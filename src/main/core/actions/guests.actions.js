export const GUESTS_FETCHED = 'GUESTS_FETCHED';
export const ADD_GUEST = 'ADD_GUEST';
export const UPDATE_GUEST = 'UPDATE_GUEST';
export const REMOVE_GUESTS = 'GUESTS_REMOVED';

export const addGuest = (guest) => ({ type: ADD_GUEST, guest });
export const updateGuest = (guest) => ({ type: UPDATE_GUEST, guest });
export const removeGuests = (guestsToRemove) => ({ type: REMOVE_GUESTS, guests: guestsToRemove });
