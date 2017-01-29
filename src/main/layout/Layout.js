import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import LayoutBar from './LayoutBar/LayoutBar';
import LayoutDrawer from './LayoutDrawer/LayoutDrawer';
import LayoutFooter from './LayoutFooter/LayoutFooter';
import Alert from './Alert/Alert';
import styles from './Layout.pcss';

const cx = classNames.bind(styles);

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  };

  constructor() {
    super();
    this.state = {
      drawer: {
        open: false,
      },
    };
  }

  toggleDrawer = () => {
    this.setState((prevState) => ({
      drawer: {
        open: !prevState.drawer.open,
      },
    }));
  };

  render() {
    return (
      <div className={cx('layout__root')}>

        <LayoutBar onMenuAction={() => this.toggleDrawer()} />
        <LayoutDrawer open={this.state.drawer.open} onToggle={this.toggleDrawer} />
        <main className={cx('layout__content')}>
          {this.props.children}
        </main>

        <LayoutFooter />
        <Alert />

      </div>
    );
  }

}
