import React, { PureComponent, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Flex, Box } from 'reflexbox';
import FontIcon from 'material-ui/FontIcon';
import Spacer from '../Spacer/Spacer';
import SeparatingLine from '../SeparatingLine/SeparatingLine';
import MediaQuery from 'react-responsive';
import classNames from 'classnames/bind';
import styles from './LoginForm.pcss';
import { connect } from 'react-redux';
import Account from '../../core/models/account.model';
import * as accountActions from '../../core/actions/account.actions';
import LocalLoginForm from '../LocalLoginForm';

const cx = classNames.bind(styles);

class LoginForm extends PureComponent {

  static propTypes = {
    account: PropTypes.instanceOf(Account).isRequired,
    signInViaGoogle: PropTypes.func.isRequired,
    bindGoogleAccount: PropTypes.func.isRequired,
    signInViaFacebook: PropTypes.func.isRequired,
    bindFacebookAccount: PropTypes.func.isRequired,
  };


  render() {
    return (
      <Flex wrap className={cx('login-form')} align="stretch" justify="space-around">

        <Box sm={12} md={5} p={1}>

          <LocalLoginForm />

        </Box>

        <MediaQuery maxWidth="767px">
          <Box col={12} p={1}>
            <SeparatingLine type="horizontal" text="or" />
          </Box>
        </MediaQuery>

        <MediaQuery minWidth="768px">
          <Box col={2} p={1}>
            <SeparatingLine type="vertical" text="or" />
          </Box>
        </MediaQuery>

        <Box sm={12} md={5} p={1}>

          <RaisedButton
            onClick={this.props.account.isSignedIn() ? this.props.bindFacebookAccount
              : this.props.signInViaFacebook}
            target="_blank"
            backgroundColor="#27cbe0"
            fullWidth
            label={this.props.account.isSignedIn() ? 'Bind facebook' : 'Continue with facebook'}
            icon={<FontIcon className="fa fa-facebook-square" />}
          />

          <Spacer weight="xs" />

          <RaisedButton
            onClick={this.props.account.isSignedIn() ? this.props.bindGoogleAccount
              : this.props.signInViaGoogle}
            target="_blank"
            backgroundColor="#27cbe0"
            fullWidth
            label={this.props.account.isSignedIn() ? 'Bind google' : 'Continue with goole'}
            icon={<FontIcon className="fa fa-google-plus-square" />}
          />

        </Box>


      </Flex>
    );
  }

}

export default connect((state) => ({
  account: state.account,
}), accountActions)(LoginForm);
