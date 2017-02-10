import React, { Component, PropTypes } from 'react';
import { Flex, Box } from 'reflexbox';
import { Field, reduxForm } from 'redux-form';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
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

class PrimaryParticipant extends Component {

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

  constructor(props) {
    super(props);
    this.state = {
      enabled: !!props.initialValues,
    };
  }

  handleToggle = () => {
    this.setState((prevState) => ({
      enabled: !prevState.enabled,
    }));
  };

  render() {
    const { participantRoleName, isEditable } = this.props;

    const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        disabled={!isEditable || !this.state.enabled}
        {...input}
        {...custom}
      />
    );

    return (
      <form>
        <Paper className={cx('primary-participant')}>

          <Toggle
            disabled={!isEditable}
            className={cx('primary-participant__toggle')}
            toggled={this.state.enabled}
            onToggle={this.handleToggle}
          />

          <Flex wrap align="center" justify="space-around">

            <Box sm={12}>
              <Avatar
                className={cx('primary-participant__avatar')}
                size={250}
              >{participantRoleName}</Avatar>
            </Box>

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
        </Paper>
      </form>
    );
  }

}

export default reduxForm({
  validate,
})(PrimaryParticipant);
