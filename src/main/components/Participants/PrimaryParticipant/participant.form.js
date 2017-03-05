import React, { PureComponent, PropTypes } from 'react';
import { Flex, Box } from 'reflexbox';
import { Field, reduxForm } from 'redux-form';
import {
  required,
  email,
  firstName,
  lastName } from '../../../core/validation/participant.validation';
import { validateIf } from '../../../core/validation/common.validation';
import {
  TextField,
} from 'redux-form-material-ui';


class ParticipantForm extends PureComponent {

  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isEditable: PropTypes.bool,
  };

  render() {
    const { isEditable, handleSubmit } = this.props;
    const validationOf = validateIf(isEditable);

    return (
      <form
        onSubmit={handleSubmit}
      >
        <Flex wrap align="center" justify="space-around">

          <Box sm={12}>

            <Field
              name="user.firstName"
              label="First name"
              floatingLabelText="First name"
              validate={validationOf([required, firstName])}
              disabled={!isEditable}
              component={TextField}
            />

          </Box>

          <Box sm={12}>

            <Field
              name="user.lastName"
              label="Last name"
              floatingLabelText="Last name"
              validate={validationOf([required, lastName])}
              disabled={!isEditable}
              component={TextField}
            />

          </Box>

          <Box sm={12}>

            <Field
              name="user.contactEmail"
              label="Contact email"
              floatingLabelText="Contact email"
              validate={validationOf([email])}
              disabled={!isEditable}
              component={TextField}
            />

          </Box>

        </Flex>
      </form>
    );
  }

}

export default reduxForm({
  enableReinitialize: true,
})(ParticipantForm);
