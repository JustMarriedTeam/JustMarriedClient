import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Account, { ACCOUNT_STATE } from '../../core/models/account.model';
import * as allAccountActions from '../../core/actions/account.actions';
import ContentSpinner from '../ContentSpinner';

export function secured(Component) {
  class AuthenticatedComponent extends React.Component {

    static propTypes = {
      account: PropTypes.instanceOf(Account).isRequired,
      accountActions: PropTypes.object.isRequired,
    };

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    checkAuth() {
      const { account, accountActions } = this.props;
      if (!account.isSignedIn()) {
        accountActions.tryRestoreAuthentication();
      }
    }

    render() {
      const { account } = this.props;

      switch (account.state) {
        case ACCOUNT_STATE.SIGNED_IN:
          return <Component {...this.props} />;
        case ACCOUNT_STATE.SIGNED_OUT:
          return <div>You cannot see this component if not logged in! Redirecting...</div>;
        case ACCOUNT_STATE.SIGNING_IN:
        case ACCOUNT_STATE.UNKNOWN:
          return <ContentSpinner />;
        default:
          throw new Error("Something's wrong!");
      }
    }
  }

  return connect((state) => ({
    account: state.account,
  }), (dispatch) => ({
    accountActions: bindActionCreators(allAccountActions, dispatch),
  }))(AuthenticatedComponent);
}
