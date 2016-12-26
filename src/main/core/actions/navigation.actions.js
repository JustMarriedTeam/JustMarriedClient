import store from "../store";
import {push} from "react-router-redux";


export const navigateToDashboard = () => store.dispatch(push('/dashboard'));