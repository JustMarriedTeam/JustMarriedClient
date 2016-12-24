import {combineReducers} from "redux";
import accountReducer from "./account.js";

const app = combineReducers({
    account: accountReducer
});

export default app;