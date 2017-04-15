import React, { PureComponent, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import * as actionBarActions from '../../core/actions/actionbar.actions';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './LayoutBar.pcss';
import Account from '../../core/models/account.model';

const cx = classNames.bind(styles);

class LayoutBar extends PureComponent {

  static propTypes = {
    actionBarMenu: PropTypes.node.isRequired,
    onMenuAction: PropTypes.func.isRequired,
    account: PropTypes.instanceOf(Account).isRequired,
  };

  render() {
    const { actionBarMenu, onMenuAction, account } = this.props;
    return (
      <AppBar
        className={cx('layout-bar')}
        onLeftIconButtonTouchTap={onMenuAction}
        iconElementRight={actionBarMenu}
        showMenuIconButton={account.isSignedIn()}
        title="JustMarried"
        zDepth={0}
      />
    );
  }

}

export default connect((state) => ({
  actionBarMenu: state.actionBar.toJS().menu,
  account: state.account,
}), actionBarActions)(LayoutBar);
