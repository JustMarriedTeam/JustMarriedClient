import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {
  createResponsiveStateReducer,
  responsiveStoreEnhancer,
} from 'redux-responsive';


// application only
import actionReducer from './reducers/action.reducer';
import alertReducer from './reducers/alert.reducer';
import popupReducer from './reducers/popup.reducer';
import modalReducer from './reducers/modal.reducer';
import accountReducer from './reducers/account.reducer';
import serverReducer from './reducers/server.reducer';
import actionBarReducer from './reducers/actionbar.reducer';

// sagas
import loginSaga from './sagas/login.saga';
import registerSaga from './sagas/register.saga';
import editSaga from './sagas/edit.saga';
import selectSaga from './sagas/select.saga';
import assignmentSaga from './sagas/assignment.saga';

// templates
import { taskTemplatesReducer } from './reducers/entities/templates.reducer';

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
    templates: combineReducers({
      tasks: taskTemplatesReducer,
    }),
    wedding: weddingReducer,
    form: formReducer,
    routing: routerReducer,
    action: actionReducer,
    alert: alertReducer,
    popup: popupReducer,
    modal: modalReducer,
    account: accountReducer,
    server: serverReducer,
    actionBar: actionBarReducer,
    browser: createResponsiveStateReducer({
      xs: 320,
      sm: 425,
      md: 768,
      lg: 1024,
    }),
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  compose(
    responsiveStoreEnhancer,
    applyMiddleware(thunk, sagaMiddleware, routerMiddleware(browserHistory))
  )
);

sagaMiddleware.run(loginSaga);
sagaMiddleware.run(registerSaga);
sagaMiddleware.run(editSaga);
sagaMiddleware.run(selectSaga);
sagaMiddleware.run(assignmentSaga);
