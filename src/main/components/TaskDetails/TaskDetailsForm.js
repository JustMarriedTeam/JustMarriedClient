import React, { PropTypes, PureComponent } from 'react';
import { Flex, Box } from 'reflexbox';
import { Field, reduxForm, formValueSelector } from 'redux-form';
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
  DatePicker,
} from 'redux-form-material-ui';
import { TASK_STATUS } from '../../core/models/task.model';
import { isMoment } from 'moment';
import { getCurrentTime } from '../../core/timer';
import store from '../../core/store';

class TaskDetailsForm extends PureComponent {

  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static isDone() {
    const selector = formValueSelector('TaskDetails');
    return selector(store.getState(), 'status') === TASK_STATUS.DONE;
  }

  render() {
    const { disabled } = this.props;

    const renderCompletionDate = () => TaskDetailsForm.isDone() // eslint-disable-line
      ? <Box sm={12}>
        <Field
          name="completionDate"
          label="Completion date"
          fullWidth
          format={(date) => isMoment(date) ? date.toDate() : date}
          floatingLabelText="Completion date"
          disabled={disabled}
          component={DatePicker}
        />
      </Box> : null;

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
              ref={(component) => { this.statusField = component; }}
              fullWidth
              floatingLabelText="Status"
              disabled={disabled}
              component={SelectField}
            >
              <MenuItem
                value={TASK_STATUS.PENDING}
                primaryText="Pending"
                onClick={() => {
                  this.props.change('completionDate', null);
                }}
              />
              <MenuItem
                value={TASK_STATUS.BLOCKED}
                primaryText="Blocked"
                onClick={() => {
                  this.props.change('completionDate', null);
                }}
              />
              <MenuItem
                value={TASK_STATUS.DONE}
                primaryText="Done"
                onClick={() => {
                  this.props.change('completionDate', getCurrentTime());
                }}
              />
            </Field>
          </Box>

          {
            renderCompletionDate()
          }

          <Box sm={12}>
            <Field
              name="deadlineDate"
              label="Deadline date"
              fullWidth
              format={(date) => isMoment(date) ? date.toDate() : date}
              floatingLabelText="Deadline date"
              disabled={disabled}
              component={DatePicker}
            />
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
