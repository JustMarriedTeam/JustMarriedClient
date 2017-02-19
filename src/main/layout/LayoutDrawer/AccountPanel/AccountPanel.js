import React, { PureComponent, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import Account from '../../../core/models/account.model';
import * as allAccountActions from '../../../core/actions/account.actions';
import IconButton from 'material-ui/IconButton';
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
      <div className={cx('account-panel')}>

        <Avatar
          className={cx('account-panel__avatar')}
          size={100}
        >G</Avatar>

        <div className={cx('account-panel__details')}>
          <h5>Hello { account.user.firstName }!</h5>
          <IconButton
            onClick={() => this.props.signOut()}
            iconClassName="material-icons"
            tooltip="Sign out"
          >
            exit_to_app
          </IconButton>
        </div>

      </div>
    );
  }
}

export default connect((state) => ({
  account: state.account,
}), allAccountActions)(AccountPanel);
