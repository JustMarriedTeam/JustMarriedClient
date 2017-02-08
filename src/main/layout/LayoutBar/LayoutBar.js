import React, { PureComponent, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import * as actionBarActions from '../../core/actions/actionbar.actions';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './LayoutBar.pcss';

const cx = classNames.bind(styles);

class LayoutBar extends PureComponent {

  static propTypes = {
    actionBar: PropTypes.object.isRequired,
    onMenuAction: PropTypes.func.isRequired,
  };

  render() {
    return (
      <AppBar
        className={cx('layout-bar')}
        style={{
          position: 'fixed',
          top: 0,
        }}
        onLeftIconButtonTouchTap={this.props.onMenuAction}
        iconElementRight={this.props.actionBar.menu || <div />}
        title="JustMarried"
        zDepth={0}
      />
    );
  }

}

export default connect((state) => ({
  actionBar: state.actionBar,
}), actionBarActions)(LayoutBar);
