import Immutable from 'immutable';
import { combineReducers } from 'redux';
import {
  WEDDING_FETCHED,
  WEDDING_SAVED,
} from '../../actions/wedding.actions';
import guestsReducer from './guests.reducer';
import participantsReducer from './participants.reducer';
import tasksReducer from './tasks.reducer';
import usersReducer from './users.reducer';

const entitiesReducer = combineReducers({
  guests: guestsReducer,
  participants: participantsReducer,
  tasks: tasksReducer,
  users: usersReducer,
});

const weddingReducer = (wedding = new Immutable.Map(), action) => {
  switch (action.type) {
    case WEDDING_FETCHED:
    case WEDDING_SAVED:
      return Immutable.Map.of(action.wedding);
    default:
      return wedding;
  }
};

export default combineReducers({
  entities: entitiesReducer,
  wedding: weddingReducer,
});
