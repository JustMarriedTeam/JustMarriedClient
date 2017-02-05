import React, { PureComponent, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Flex, Box } from 'reflexbox';
import { Field, reduxForm } from 'redux-form';
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

const validate = values => {
  const errors = {};
  const requiredFields = ['login', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

class LoginForm extends PureComponent {

  static propTypes = {
    account: PropTypes.instanceOf(Account).isRequired,
    signInViaLocal: PropTypes.func.isRequired,
    bindLocalAccount: PropTypes.func.isRequired,
    signInViaGoogle: PropTypes.func.isRequired,
    bindGoogleAccount: PropTypes.func.isRequired,
    signInViaFacebook: PropTypes.func.isRequired,
    bindFacebookAccount: PropTypes.func.isRequired,
  };

  handleSubmit = (credentials) => {
    if (this.props.account.isSignedIn()) {
      this.props.bindLocalAccount({
        login: credentials.login,
        password: credentials.password,
      });
    } else {
      this.props.signInViaLocal({
        login: 'ggurgul',
        password: 'ggurgul',
      });
    }
  };

  render() {
    const { submitting } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Flex wrap className={cx('login-form')} align="stretch" justify="space-around">

          <Box sm={12} md={5} p={1}>


            <Field
              name="login"
              fullWidth
              component={renderTextField}
              label="Login"
            />

            <Field
              name="password"
              fullWidth
              component={renderTextField}
              label="Password"
            />

            <Spacer weight="md" />

            <div className={cx('local-login-btn-section')}>
              <RaisedButton
                primary
                disabled={submitting}
                type="submit"
                label="Sign in"
              />
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
      </form>
    );
  }

}

export default connect((state) => ({
  account: state.account,
}), accountActions)(reduxForm({
  form: 'LoginForm',
  validate,
})(LoginForm));
