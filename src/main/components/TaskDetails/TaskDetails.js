import React, { Component, PropTypes } from 'react';
import { Flex, Box } from 'reflexbox';
import classNames from 'classnames/bind';
import styles from './TaskDetails.pcss';
import { connect } from 'react-redux';
import Task from '../../core/models/task.model';
import RelatedTasks from '../RelatedTasks/RelatedTasks';
import * as allTaskActions from '../../core/actions/task.actions';
import * as allModalActions from '../../core/actions/modal.actions';
import { bindActionCreators } from 'redux';
import {
  selectTasksRequiredFor,
  selectTasksDependingOn,
  selectTasksUnrelatedTo,
} from '../../core/selectors/tasks.selector';
import TaskDetailsForm from './TaskDetailsForm';

const cx = classNames.bind(styles);

class TaskDetails extends Component {

  static propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    isEditable: PropTypes.bool.isRequired,

    /**
     * Set internally by connect
     */
    taskActions: PropTypes.object.isRequired,
    modalActions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super();
    this.state = {
      task: props.task,
    };
  }

  refreshTask = (task) => {
    this.setState({
      task,
    });
  };

  render() {
    const { isEditable } = this.props;
    const { task } = this.state;

    return (
      <Flex wrap className={cx('task-details')} align="stretch" justify="space-around">

        <Box sm={12}>

          <img
            className={cx('task-details__image')}
            role="presentation"
            src="http://meetingking.com/wp-content/images/meetingking_tasks.png"
          />

          <TaskDetailsForm
            initialValues={task.toJS()}
            disabled={!isEditable}
            onSubmit={(values) => alert(values)}
          />

        </Box>

        <Box sm={12} lg={6} p={1}>

          <RelatedTasks
            title={'Depending on'}
            isEditable={isEditable}
            toTask={task}
            relatedTasksSelector={selectTasksRequiredFor}
            unrelatedTasksSelector={selectTasksUnrelatedTo}
            onTaskAdded={(requiredTask) =>
              this.refreshTask(task.addDependency(requiredTask))}
            onTaskRemoved={(notRequiredTask) =>
              this.refreshTask(task.removeDependency(notRequiredTask))}
          />

        </Box>

        <Box sm={12} lg={6} p={1}>

          <RelatedTasks
            title={'Required for'}
            isEditable={isEditable}
            toTask={task}
            relatedTasksSelector={selectTasksDependingOn}
            unrelatedTasksSelector={selectTasksUnrelatedTo}
            onTaskAdded={(dependentTask) =>
              this.refreshTask(task.addRequirement(dependentTask))}
            onTaskRemoved={(notDependentTask) =>
              this.refreshTask(task.removeRequirement(notDependentTask))}
          />

        </Box>


      </Flex>
    );
  }

}

export default connect(
  () => ({}),
  (dispatch) => ({
    taskActions: bindActionCreators(allTaskActions, dispatch),
    modalActions: bindActionCreators(allModalActions, dispatch),
  })
)(TaskDetails);

