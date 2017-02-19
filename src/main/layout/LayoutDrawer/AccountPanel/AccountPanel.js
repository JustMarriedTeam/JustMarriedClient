import React, { PureComponent, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import Account from '../../../core/models/account.model';
import * as allAccountActions from '../../../core/actions/account.actions';
import classNames from 'classnames/bind';
import styles from './AccountPanel.pcss';

const cx = classNames.bind(styles);

class AccountPanel extends PureComponent {

  static propTypes = {
    account: PropTypes.instanceOf(Account).isRequired,
    signOut: PropTypes.func.isRequired,
  };

  render() {
    const { account } = this.props;

    return (
      <div>
        <Avatar
          className={cx('account-panel__avatar')}
          size={250}
        >G</Avatar>
      </div>
    );
  }
}

export default connect((state) => ({
  account: state.account,
}), allAccountActions)(AccountPanel);
