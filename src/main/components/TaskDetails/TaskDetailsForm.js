import React, { PropTypes, PureComponent } from 'react';
import { Flex, Box } from 'reflexbox';
import { Field, reduxForm } from 'redux-form';
import {
  required,
} from '../../core/validation/common.validation';
import {
  taskDescription,
} from '../../core/validation/task.validation';
import {
  TextField,
} from 'redux-form-material-ui';

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
