import React, { PureComponent, PropTypes } from 'react';
import Account from '../../core/models/account.model';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Spacer from '../Spacer/Spacer';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames/bind';
import styles from './LocalLoginForm.pcss';
import { connect } from 'react-redux';
import * as accountActions from '../../core/actions/account.actions';

const cx = classNames.bind(styles);

const validate = values => {
  const errors = {};
  const requiredFields = ['login', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Wymagane';
    }
  });
  return errors;
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => ( // eslint-disable-line
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);
let buttonStyleBg = {
    backgroundColor: '#6ed1d0',
    color: 'white',
    padding: '5px',
    height: 'auto',
    margin: '0 10px',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.12)',
}
class LocalLoginForm extends PureComponent {

  static propTypes = {
    account: PropTypes.instanceOf(Account).isRequired,
    signInViaLocal: PropTypes.func.isRequired,
    bindLocalAccount: PropTypes.func.isRequired,
  };

  issueAuthenticationRequest = (credentials) => {
    if (this.props.account.isSignedIn()) {
      this.props.bindLocalAccount(credentials);
    } else {
      this.props.signInViaLocal(credentials);
    }
  };

  render() {
    const { submitting, handleSubmit } = this.props;

    return (<form onSubmit={handleSubmit(this.issueAuthenticationRequest)}>
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
        label="Hasło"
      />

      <Spacer weight="md" />

      <div className={cx('local-login-form__buttons-plh')}>
        <FlatButton
         
          style={buttonStyleBg}
          disabled={submitting}
          type="submit"
          label="Zaloguj się"
        />
      </div>
    </form>);
  }

}

export default connect((state) => ({
  account: state.account,
}), accountActions)(reduxForm({
  form: 'LocalLoginForm',
  validate,
})(LocalLoginForm));
