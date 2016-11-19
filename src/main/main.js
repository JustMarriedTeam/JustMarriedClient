import "babel-polyfill";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory} from "react-router";
import {Provider} from "react-redux";
import Store from "./core/store";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import ErrorPage from "./pages/error/error";
import HomePage from "./pages/home/home";
import AboutPage from "./pages/about/about";
import Tasks from "./pages/tasks/tasks";
import Task from "./pages/task/task";

injectTapEventPlugin();

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Provider store={Store}>{this.props.children}</Provider>
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/home" component={HomePage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/tasks" component={Tasks}>
                <Route path="/tasks/:taskId" component={Task}/>
            </Route>
            <Route path="*" component={ErrorPage}/>
        </Route>
    </Router>,
    document.getElementById('container')
);