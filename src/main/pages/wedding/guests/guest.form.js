import React, { PropTypes, PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Spacer from '../../../components/Spacer';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const validate = values => {
  const errors = {};
  const requiredFields = ['firstName', 'lastName', 'sex'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
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

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup {...input} {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

class GuestForm extends PureComponent {

  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    return (
      <form>
        <Field name="firstName" component={renderTextField} label="First Name" />
        <Field name="lastName" component={renderTextField} label="Last Name" />
        <Field name="contactEmail" component={renderTextField} label="Email" />

        <Spacer weight="sm" />

        <div>
          <label>Sex</label>
          <Field name="sex" component={renderRadioGroup}>
            <RadioButton value="male" label="male" />
            <RadioButton value="female" label="female" />
          </Field>
        </div>

      </form>
    );
  }

}

export default reduxForm({
  form: 'GuestForm',
  validate,
})(GuestForm);
