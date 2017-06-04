import "whatwg-fetch";
import React, {PropTypes} from "react";
import classNames from "classnames/bind";
import {Provider} from "react-redux";
import store from "./core/store";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Theme from "./theme/theme";
import styles from "./styles/main.css";

const cx = classNames.bind(styles);

export default class App extends React.Component {

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
