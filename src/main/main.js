import "babel-polyfill";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import classNames from 'classnames/bind'
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

import styles from './styles/main.css';

let cx = classNames.bind(styles);

injectTapEventPlugin();

class App extends React.Component {

    static childContextTypes = {
        reflexbox: React.PropTypes.object
    };

    getChildContext = () => {
        return {
            reflexbox: {
                degug: true,
                breakpoints: {
                    sm: '(min-width: 30em)',
                    md: '(min-width: 48em)',
                    lg: '(min-width: 60em)'
                }
            }
        }
    };

    render() {
        return (
            <MuiThemeProvider>
                <Provider store={Store}>
                    <div className={cx('root')}>{this.props.children}</div>
                </Provider>
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