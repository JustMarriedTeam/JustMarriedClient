import React, { PropTypes, PureComponent } from 'react';
import Spacer from '../../../components/Spacer';
import { Flex, Box } from 'reflexbox';
import { Field, reduxForm } from 'redux-form';
import {
  required,
  email,
  firstName,
  lastName,
} from '../../../core/validation/participant.validation';
import { RadioButton } from 'material-ui/RadioButton';
import {
  TextField,
  RadioButtonGroup,
} from 'redux-form-material-ui';

class GuestForm extends PureComponent {

  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { disabled } = this.props;

    return (
      <form>
        <Flex wrap align="center" justify="space-around">

          <Box sm={12}>
            <Field
              name="firstName"
              label="First name"
              floatingLabelText="First name"
              validate={[required, firstName]}
              disabled={disabled}
              component={TextField}
            />
          </Box>

          <Box sm={12}>
            <Field
              name="lastName"
              label="Last name"
              floatingLabelText="Last name"
              validate={[required, lastName]}
              disabled={disabled}
              component={TextField}
            />
          </Box>

          <Box sm={12}>
            <Field
              name="contactEmail"
              label="Contact email"
              floatingLabelText="Contact email"
              validate={email}
              disabled={disabled}
              component={TextField}
            />
          </Box>

          <Spacer weight="sm" />

          <Box sm={12}>
            <Field name="sex" component={RadioButtonGroup}>
              <RadioButton
                value="M"
                label="Male"
                disabled={disabled}
              />
              <RadioButton
                value="F"
                label="Female"
                disabled={disabled}
              />
            </Field>
          </Box>

        </Flex>
      </form>
    );
  }

}

export default reduxForm({
  form: 'GuestForm',
})(GuestForm);
