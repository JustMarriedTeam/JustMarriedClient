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

class GuestForm extends PureComponent {

  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { disabled } = this.props;

    const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => ( // eslint-disable-line
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        disabled={disabled}
        {...input}
        {...custom}
      />
    );

    const renderRadioGroup = ({ input, ...rest }) => ( // eslint-disable-line
      <RadioButtonGroup
        valueSelected={input.value}
        onChange={(event, value) => input.onChange(value)}
        {...input}
        {...rest}
      />
    );

    return (
      <form>
        <Field name="firstName" component={renderTextField} label="First Name" />
        <Field name="lastName" component={renderTextField} label="Last Name" />
        <Field name="contactEmail" component={renderTextField} label="Email" />

        <Spacer weight="sm" />

        <div>
          <label>Sex</label>
          <Field name="sex" component={renderRadioGroup}>
            <RadioButton
              disabled={disabled}
              value="M"
              label="male"
            />

            <RadioButton
              disabled={disabled}
              value="F"
              label="female"
            />
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
