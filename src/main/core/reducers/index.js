import {combineReducers} from "redux";
import accountReducer from "./account.reducer.js";

const app = combineReducers({
    account: accountReducer
});

export default app;