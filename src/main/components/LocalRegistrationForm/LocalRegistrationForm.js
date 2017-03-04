import React, { PureComponent, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Spacer from '../Spacer/Spacer';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as accountActions from '../../core/actions/account.actions';

const validate = values => {
  const errors = {};
  const requiredFields = ['login', 'password', 'passwordRepeated'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

class LocalRegistrationForm extends PureComponent {

  static propTypes = {
    signUpViaLocalAccount: PropTypes.func.isRequired,
  };

  render() {
    const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => ( // eslint-disable-line
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    );

    const { handleSubmit, submitting, signUpViaLocalAccount } = this.props;

    return (
      <form onSubmit={handleSubmit((credentials) => signUpViaLocalAccount(credentials))}>

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

        <Field
          name="repeatedPassword"
          fullWidth
          component={renderTextField}
          label="Repeated password"
        />

        <Spacer weight="md" />

        <RaisedButton
          primary
          disabled={submitting}
          type="submit"
          label="Sign up"
        />

      </form>);
  }

}


export default connect((state) => ({
  account: state.account,
}), accountActions)(reduxForm({
  form: 'LocalRegistrationForm',
  validate,
})(LocalRegistrationForm));
