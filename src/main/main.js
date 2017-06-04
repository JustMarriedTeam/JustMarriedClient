import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames/bind";
import {browserHistory, IndexRoute, Route, Router} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import store from "./core/store";
import injectTapEventPlugin from "react-tap-event-plugin";
import ErrorPage from "./pages/error/error";
import HomePage from "./pages/home/home.page";
import WeddingPage from "./pages/wedding/wedding.page";
import DashboardPage from "./pages/dashboard/dashboard";
import TimelinePage from "./pages/timeline/timeline.page";
import Tasks from "./pages/tasks/tasks.page";
import {secured} from "./components/SecuredComponent";
import styles from "./styles/main.css";
import App from "./app";

const cx = classNames.bind(styles);

injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="/home" component={HomePage} />
      <Route path="/dashboard" component={secured(DashboardPage)} />
      <Route path="/timeline" component={secured(TimelinePage)} />
      <Route path="/wedding" component={secured(WeddingPage)} />
      <Route path="/tasks" component={secured(Tasks)} />
      <Route path="*" component={ErrorPage} />
    </Route>
  </Router>,
  document.getElementById('container')
);
