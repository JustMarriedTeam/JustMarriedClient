import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router'
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import actionReducer from './reducers/action.reducer';
import alertReducer from './reducers/alert.reducer';
import accountReducer from './reducers/account.reducer';
import serverReducer from './reducers/server.reducer';
import weddingReducer from './reducers/wedding.reducer';
import actionBarReducer from './reducers/actionbar.reducer';
import loginSaga from './sagas/login.saga';
import editSaga from './sagas/edit.saga';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({
    action: actionReducer,
    alert: alertReducer,
    form: formReducer,
    account: accountReducer,
    server: serverReducer,
    wedding: weddingReducer,
    routing: routerReducer,
    actionBar: actionBarReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  applyMiddleware(thunk, sagaMiddleware, routerMiddleware(browserHistory))
);

sagaMiddleware.run(loginSaga);
sagaMiddleware.run(editSaga);
