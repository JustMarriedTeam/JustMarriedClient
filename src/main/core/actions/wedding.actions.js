import { getWedding, postWedding, putWedding } from '../api/wedding.api';
import { getTasks } from '../api/tasks.api';
import { sendingRequest, notifyRequestFailed } from './server.actions';

export const WEDDING_FETCHED = 'WEDDING_FETCHED';
export const WEDDINGS_FETCHED = 'WEDDINGS_FETCHED';
export const WEDDING_SAVED = 'WEDDING_SAVED';
export const WEDDING_CREATED = 'WEDDING_CREATED';
export const ADD_GUEST = 'ADD_GUEST';
export const UPDATE_GUEST = 'UPDATE_GUEST';
export const REMOVE_GUESTS = 'GUESTS_REMOVED';
export const UPDATE_PARTICIPANT = 'PARTICIPANT_UPDATED';
export const TOGGLE_PARTICIPANT = 'PARTICIPANT_TOGGLED';

export const PARTICIPANTS_FETCHED = 'PARTICIPANTS_FETCHED';
export const GUESTS_FETCHED = 'GUESTS_FETCHED';
export const TASKS_FETCHED = 'TASKS_FETCHED';
export const USERS_FETCHED = 'USERS_FETCHED';

export const addGuest = (guest) => ({ type: ADD_GUEST, guest });
export const updateGuest = (guest) => ({ type: UPDATE_GUEST, guest });
export const removeGuests = (guestsToRemove) => ({ type: REMOVE_GUESTS, guests: guestsToRemove });

export const updateParticipant = (participant) => ({ type: UPDATE_PARTICIPANT, participant });
export const toggleParticipant = (participant) => ({ type: TOGGLE_PARTICIPANT, participant });


export const fetchWedding = (query) => (dispatch) => {
  dispatch(sendingRequest(true));
  return getWedding(query)
    .then((wedding) => {
      const {
        weddings,
        participants,
        guests,
        users,
        tasks } = wedding.entities;

      dispatch({ type: PARTICIPANTS_FETCHED, participants });
      dispatch({ type: GUESTS_FETCHED, guests });
      dispatch({ type: TASKS_FETCHED, tasks });
      dispatch({ type: USERS_FETCHED, users });
      dispatch({ type: WEDDINGS_FETCHED, weddings });

      dispatch({ type: WEDDING_FETCHED, id: wedding.result });
    })
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

export const createWedding = (createdWedding) => (dispatch) => {
  dispatch(sendingRequest(true));
  return postWedding(createdWedding)
    .then((wedding) => dispatch(({ type: WEDDING_CREATED, wedding })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

export const saveWedding = (savedWedding) => (dispatch) => {
  dispatch(sendingRequest(true));
  return putWedding(savedWedding)
    .then((wedding) => dispatch(({ type: WEDDING_SAVED, wedding })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

export const loadTasks = (query) => (dispatch) => {
  dispatch(sendingRequest(true));
  return getTasks(query)
    .then((tasks) => dispatch(({ type: TASKS_FETCHED, tasks })))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};
