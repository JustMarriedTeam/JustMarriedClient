import React, { PureComponent, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import * as actionBarActions from '../../core/actions/actionbar.actions';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Scroll from 'react-scroll';
import styles from './LayoutBar.pcss';
import Account from '../../core/models/account.model';

const cx = classNames.bind(styles);
const scroller = Scroll.scroller;

class LayoutBar extends PureComponent {

  static propTypes = {
    actionBarMenu: PropTypes.node.isRequired,
    onMenuAction: PropTypes.func.isRequired,
    account: PropTypes.instanceOf(Account).isRequired,
  };

  handleStart = () => {
    scroller.scrollTo('start', {
      duration: 1000,
      delay: 100,
      smooth: true,
    });
  };

  handleMore = () => {
    scroller.scrollTo('more', {
      duration: 1000,
      delay: 100,
      smooth: true,
    });
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

      >
        <div className={cx('layout-bar-menu')}>
          <span onClick={this.handleStart}>start</span>
          <span onClick={this.handleMore}>odkryj</span>
          <span>działaj</span>

        </div>

      </AppBar>
    );
  }

}

export default connect((state) => ({
  actionBarMenu: state.actionBar.toJS().menu,
  account: state.account,
}), actionBarActions)(LayoutBar);

