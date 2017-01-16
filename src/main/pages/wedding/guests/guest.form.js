import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import * as guestActions from '../../../core/actions/guest.actions';

const validate = values => {
  const errors = {};
  const requiredFields = ['firstName', 'lastName', 'email', 'sex'];
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
    guest: PropTypes.object,
  };

  constructor(props) {
    super();
    this.state = {
      initialValues: props.guest,
    };
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="firstName" component={renderTextField} label="First Name" />
        </div>
        <div>
          <Field name="lastName" component={renderTextField} label="Last Name" />
        </div>
        <div>
          <Field name="email" component={renderTextField} label="Email" />
        </div>
        <div>
          <Field name="sex" component={renderRadioGroup}>
            <RadioButton value="male" label="male" />
            <RadioButton value="female" label="female" />
          </Field>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
          </button>
        </div>
      </form>
    );
  }

}

export default connect(
  (state) => ({

  }),
  guestActions
)(
  reduxForm({
    form: 'GuestForm',
    validate,
  })(GuestForm)
);
