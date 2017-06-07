import React, { PureComponent, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Flex, Box } from 'reflexbox';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Spacer from '../Spacer/Spacer';
import SeparatingLine from '../SeparatingLine/SeparatingLine';
import MediaQuery from 'react-responsive';
import classNames from 'classnames/bind';
import styles from './LoginForm.pcss';
import { connect } from 'react-redux';
import Account from '../../core/models/account.model';
import * as allAccountActions from '../../core/actions/account.actions';
import LocalLoginForm from '../LocalLoginForm';

const cx = classNames.bind(styles);

let buttonTrans = {

    backgroundColor: '#E57878',
    color: 'white',
    padding: '3px',
    height: 'auto',
    margin: '5px 10px 5px 10px',
    width: '270px',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.12)',
};
 


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
            <SeparatingLine type="horizontal" text="lub" />
          </Box>
        </MediaQuery>

        <MediaQuery minWidth="768px">
          <Box col={2} p={1}>
            <SeparatingLine type="vertical" text="lub" />
          </Box>
        </MediaQuery>

        <Box sm={12} md={5} p={1}>
        <div className={cx('buttons-group')}>
          <FlatButton
            onClick={this.props.account.isSignedIn() ? this.props.bindFacebookAccount
              : this.props.signInViaFacebook}
            target="_blank"
            
            style={buttonTrans}
            color = "#ffffff"
            fullWidth
            label={this.props.account.isSignedIn() ? 'Bind facebook' : 'Kontynuuj przez facebook'}
            icon={<FontIcon className="fa fa-facebook-square" />}
          />

          <Spacer weight="xs" />

          <FlatButton
            onClick={this.props.account.isSignedIn() ? this.props.bindGoogleAccount
              : this.props.signInViaGoogle}
            target="_blank"
            
            fullWidth
             style={buttonTrans}
            label={this.props.account.isSignedIn() ? 'Bind google' : 'Kontynuuj przez google'}
            icon={<FontIcon className="fa fa-google-plus-square" />}
          />
        </div>
        </Box>


      </Flex>
    );
  }

}

export default connect((state) => ({
  account: state.account,
}), allAccountActions)(LoginForm);
