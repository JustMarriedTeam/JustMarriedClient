import React, { PureComponent, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import * as actionBarActions from '../../core/actions/actionbar.actions';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './LayoutBar.pcss';

const cx = classNames.bind(styles);

class LayoutBar extends PureComponent {

  static propTypes = {
    actionBarMenu: PropTypes.node.isRequired,
    onMenuAction: PropTypes.func.isRequired,
  };

  render() {
    const { actionBarMenu, onMenuAction } = this.props;
    return (
      <AppBar
        className={cx('layout-bar')}
        style={{
          position: 'fixed',
          top: 0,
        }}
        onLeftIconButtonTouchTap={onMenuAction}
        iconElementRight={actionBarMenu}
        title="JustMarried"
        zDepth={0}
      />
    );
  }

}

export default connect((state) => ({
  actionBarMenu: state.actionBar.menu,
}), actionBarActions)(LayoutBar);
