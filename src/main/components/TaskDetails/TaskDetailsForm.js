import React, { PropTypes, PureComponent } from 'react';
import { Flex, Box } from 'reflexbox';
import { Field, reduxForm } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import {
  required,
} from '../../core/validation/common.validation';
import {
  taskName,
  taskDescription,
} from '../../core/validation/task.validation';
import {
  TextField,
  SelectField,
} from 'redux-form-material-ui';
import { TASK_STATUS } from '../../core/models/task.model';

class TaskDetailsForm extends PureComponent {

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
              name="name"
              label="Name"
              fullWidth
              floatingLabelText="Name"
              validate={[required, taskName]}
              disabled={disabled}
              component={TextField}
            />
          </Box>

          <Box sm={12}>
            <Field
              name="status"
              label="Status"
              fullWidth
              floatingLabelText="Status"
              disabled={disabled}
              component={SelectField}
            >
              <MenuItem value={TASK_STATUS.PENDING} primaryText="Pending" />
              <MenuItem value={TASK_STATUS.BLOCKED} primaryText="Blocked" />
              <MenuItem value={TASK_STATUS.DONE} primaryText="Done" />
            </Field>
          </Box>

          <Box sm={12}>
            <Field
              name="description"
              label="Description"
              fullWidth
              floatingLabelText="Description"
              validate={[required, taskDescription]}
              disabled={disabled}
              multiLine
              rows={1}
              rowsMax={10}
              component={TextField}
            />
          </Box>

        </Flex>
      </form>
    );
  }

}

export default reduxForm({
  form: 'TaskDetails',
})(TaskDetailsForm);
