import React, { PureComponent, PropTypes } from 'react';
import { Flex, Box } from 'reflexbox';
import { Field, reduxForm } from 'redux-form';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import classNames from 'classnames/bind';
import styles from './primary.participant.pcss';

const cx = classNames.bind(styles);

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

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

class PrimaryParticipant extends PureComponent {

  static propTypes = {
    participantRole: PropTypes.string.isRequired,
    participantRoleName: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    isEditable: PropTypes.bool,
  };

  static defaultProps = {
    isEditable: false,
  };

  render() {
    const { participantRoleName, isEditable } = this.props;
    return (
      <form>
        <Flex wrap className={cx('primary-participant')} align="center" justify="space-around">

          <Box sm={12}>
            <Avatar
              className={cx('primary-participant__avatar')}
              size={250}
            >{participantRoleName}</Avatar>
          </Box>

          <Box sm={12}>

            <Field
              name="firstName"
              component={renderTextField}
              label="First name"
              disabled={!isEditable}
            />

          </Box>

          <Box sm={12}>

            <Field
              name="lastName"
              component={renderTextField}
              label="Last name"
              disabled={!isEditable}
            />

          </Box>

          <Box sm={12}>

            <Field
              name="emailAddress"
              component={renderTextField}
              label="E-Mail address"
              disabled={!isEditable}
            />

          </Box>

        </Flex>
      </form>
    );
  }

}

export default reduxForm({
  validate,
})(PrimaryParticipant);
