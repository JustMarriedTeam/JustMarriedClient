import React, { PureComponent, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Flex, Box } from 'reflexbox';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import Spacer from '../Spacer/Spacer';
import SeparatingLine from '../SeparatingLine/SeparatingLine';
import MediaQuery from 'react-responsive';
import classNames from 'classnames/bind';
import styles from './LoginForm.pcss';
import { connect } from 'react-redux';
import Account from '../../core/models/account.model';
import * as accountActions from '../../core/actions/account.actions';

const cx = classNames.bind(styles);


class LoginForm extends PureComponent {

  static propTypes = {
    account: PropTypes.instanceOf(Account).isRequired,
    signInViaGoogle: PropTypes.func.isRequired,
    signInViaFacebook: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Flex wrap className={cx('login-form')} align="stretch" justify="space-around">

        <Box sm={12} md={5} p={1}>
          <TextField
            fullWidth
            hintText="Login"
          />

          <Spacer weight="xs" />

          <TextField
            fullWidth
            hintText="Password"
          />

          <Spacer weight="md" />

          <div className={cx('local-login-btn-section')}>
            <RaisedButton primary label="Login" />
          </div>
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
            onClick={this.props.signInViaGoogle}
            target="_blank"
            backgroundColor="#27cbe0"
            fullWidth
            label="Login with google"
            icon={<FontIcon className="fa fa-google-plus-square" />}
          />

          <Spacer weight="xs" />

          <RaisedButton
            onClick={this.props.signInViaFacebook}
            target="_blank"
            backgroundColor="#27cbe0"
            fullWidth
            label="Login with facebook"
            icon={<FontIcon className="fa fa-facebook-square" />}
          />

        </Box>


      </Flex>
    );
  }

}

export default connect((state) => ({
  account: state.account,
}), accountActions)(LoginForm);
