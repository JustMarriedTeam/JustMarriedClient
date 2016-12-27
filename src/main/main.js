import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './core/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ErrorPage from './pages/error/error';
import HomePage from './pages/home/home';
import AboutPage from './pages/about/about';
import Tasks from './pages/tasks/tasks';
import Task from './pages/task/task';
import Theme from './theme/theme';
import styles from './styles/main.css';

const cx = classNames.bind(styles);

injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {

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
      <Route path="/home" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/tasks" component={Tasks}>
        <Route path="/tasks/:taskId" component={Task} />
      </Route>
      <Route path="*" component={ErrorPage} />
    </Route>
  </Router>,
  document.getElementById('container')
);
