import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import accountReducer from './reducers/account.reducer';
import serverReducer from './reducers/server.reducer';
import tasksReducer from './reducers/tasks.reducer';
import actionBarReducer from './reducers/actionbar.reducer';
import loginSaga from './sagas/login.saga';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({
    account: accountReducer,
    server: serverReducer,
    tasks: tasksReducer,
    routing: routerReducer,
    actionBar: actionBarReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(loginSaga);
