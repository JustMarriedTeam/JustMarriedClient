import React, { PureComponent, PropTypes } from 'react';
import { Flex, Box } from 'reflexbox';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';


const validate = values => {
  const errors = {};
  const requiredFields = ['firstName', 'lastName'];
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

class ParticipantForm extends PureComponent {

  static propTypes = {
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    isEditable: PropTypes.bool,
  };

  render() {
    const { isEditable } = this.props;

    const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        disabled={!isEditable}
        {...input}
        {...custom}
      />
    );

    return (
      <form>
        <Flex wrap align="center" justify="space-around">

          <Box sm={12}>

            <Field
              name="user.firstName"
              component={renderTextField}
              label="First name"
            />

          </Box>

          <Box sm={12}>

            <Field
              name="user.lastName"
              component={renderTextField}
              label="Last name"
            />

          </Box>

          <Box sm={12}>

            <Field
              name="user.email"
              component={renderTextField}
              label="E-Mail address"
            />

          </Box>

        </Flex>
      </form>
    );
  }

}

export default reduxForm({
  validate,
})(ParticipantForm);
