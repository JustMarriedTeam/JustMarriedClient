import {createStore, combineReducers, applyMiddleware} from "redux";
import {routerReducer} from "react-router-redux";
import thunk from "redux-thunk";
import accountReducer from "./reducers/account.reducer";

export default createStore(
    combineReducers({
        account: accountReducer,
        routing: routerReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
