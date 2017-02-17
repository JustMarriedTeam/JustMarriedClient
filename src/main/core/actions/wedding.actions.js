import { getWedding, postWedding, putWedding } from '../api/wedding.api';
import { getTasks } from '../api/tasks.api';
import { sendingRequest, notifyRequestFailed } from './server.actions';

import {
  PARTICIPANTS_FETCHED,
} from './participant.actions';

export const WEDDING_FETCHED = 'WEDDING_FETCHED';
export const WEDDINGS_FETCHED = 'WEDDINGS_FETCHED';
export const WEDDING_SAVED = 'WEDDING_SAVED';
export const WEDDING_CREATED = 'WEDDING_CREATED';
export const ADD_GUEST = 'ADD_GUEST';
export const UPDATE_GUEST = 'UPDATE_GUEST';
export const REMOVE_GUESTS = 'GUESTS_REMOVED';

export const GUESTS_FETCHED = 'GUESTS_FETCHED';
export const TASKS_FETCHED = 'TASKS_FETCHED';
export const USERS_FETCHED = 'USERS_FETCHED';

export const WEDDING_EDIT_STARTED = 'WEDDING_EDIT_STARTED';
export const WEDDING_EDIT_CANCELLED = 'WEDDING_EDIT_CANCELLED';
export const WEDDING_EDIT_SUBMITTED = 'WEDDING_EDIT_SUBMITTED';
export const WEDDING_EDIT_ENDED = 'WEDDING_EDIT_ENDED';

export const addGuest = (guest) => ({ type: ADD_GUEST, guest });
export const updateGuest = (guest) => ({ type: UPDATE_GUEST, guest });
export const removeGuests = (guestsToRemove) => ({ type: REMOVE_GUESTS, guests: guestsToRemove });

export const startWeddingEdit = () => ({ type: WEDDING_EDIT_STARTED });
export const cancelWeddingEdit = () => ({ type: WEDDING_EDIT_CANCELLED });
export const submitWeddingEdit = () => ({ type: WEDDING_EDIT_SUBMITTED });
export const endWeddingEdit = () => ({ type: WEDDING_EDIT_ENDED });

const propagateWeddingUpdate = (dispatch) => (wedding) => {
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

  return wedding;
};

export const fetchWedding = (query) => (dispatch) => {
  dispatch(sendingRequest(true));
  return getWedding(query)
    .then(propagateWeddingUpdate(dispatch))
    .then((wedding) => dispatch({ type: WEDDING_FETCHED, id: wedding.result }))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

export const createWedding = (createdWedding) => (dispatch) => {
  dispatch(sendingRequest(true));
  return postWedding(createdWedding)
    .then(propagateWeddingUpdate(dispatch))
    .then((wedding) => dispatch({ type: WEDDING_CREATED, id: wedding.result }))
    .catch((err) => dispatch(notifyRequestFailed(err)))
    .finally(() => dispatch(sendingRequest(false)));
};

export const saveWedding = (savedWedding) => (dispatch) => {
  dispatch(sendingRequest(true));
  return putWedding(savedWedding)
    .then(propagateWeddingUpdate(dispatch))
    .then((wedding) => dispatch({ type: WEDDING_SAVED, id: wedding.result }))
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
