import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router'
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

// application only
import actionReducer from './reducers/action.reducer';
import alertReducer from './reducers/alert.reducer';
import accountReducer from './reducers/account.reducer';
import serverReducer from './reducers/server.reducer';
import actionBarReducer from './reducers/actionbar.reducer';

// sagas
import loginSaga from './sagas/login.saga';
import editSaga from './sagas/edit.saga';

// entities
import guestsReducer from './reducers/entities/guests.reducer';
import participantsReducer from './reducers/entities/participants.reducer';
import tasksReducer from './reducers/entities/tasks.reducer';
import usersReducer from './reducers/entities/users.reducer';
import weddingsReducer from './reducers/entities/weddings.reducer';

// context
import weddingReducer from './reducers/wedding.reducer';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({
    entities: combineReducers({
      weddings: weddingsReducer,
      guests: guestsReducer,
      participants: participantsReducer,
      tasks: tasksReducer,
      users: usersReducer,
    }),
    wedding: weddingReducer,
    form: formReducer,
    routing: routerReducer,
    action: actionReducer,
    alert: alertReducer,
    account: accountReducer,
    server: serverReducer,
    actionBar: actionBarReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  applyMiddleware(thunk, sagaMiddleware, routerMiddleware(browserHistory))
);

sagaMiddleware.run(loginSaga);
sagaMiddleware.run(editSaga);
