import 'whatwg-fetch';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './core/store';
import { tryCookieAuthentication } from './core/cookies';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ErrorPage from './pages/error/error';
import HomePage from './pages/home/home';
import WeddingPage from './pages/wedding/wedding';
import DashboardPage from './pages/dashboard/dashboard';
import Tasks from './pages/tasks/tasks';
import Task from './pages/task/task';
import Theme from './theme/theme';
import styles from './styles/main.css';

import { onEnterWedding } from './core/routing/wedding.routing';

const cx = classNames.bind(styles);

injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  };

  static childContextTypes = {
    reflexbox: React.PropTypes.object,
  };

  getChildContext = () => ({
    reflexbox: {
      degug: true,
      breakpoints: {
        sm: '(min-width: 320px)',
        md: '(min-width: 768px)',
        lg: '(min-width: 1024px)',
      },
    },
  });

  componentWillMount() {
    tryCookieAuthentication();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={Theme}>
        <Provider store={store}>
          <div className={cx('root')}>{this.props.children}</div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="/home" component={HomePage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/wedding" component={WeddingPage} onEnter={onEnterWedding} />
      <Route path="/tasks" component={Tasks}>
        <Route path="/tasks/:taskId" component={Task} />
      </Route>
      <Route path="*" component={ErrorPage} />
    </Route>
  </Router>,
  document.getElementById('container')
);
