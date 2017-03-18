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

  render() {
    const { task } = this.state;

    return (
      <Flex wrap className={cx('task-details')} align="stretch" justify="space-around">

        <Box sm={12}>

          <img
            className={cx('task-details__image')}
            role="presentation"
            src="http://meetingking.com/wp-content/images/meetingking_tasks.png"
          />

          {task.description}

        </Box>

        <Box sm={12} lg={6} p={1}>

          <RelatedTasks
            title={'Depending on'}
            tasks={task.getRequiredTasks()}
            onTaskAdded={(requiredTask) => task.addDependency(requiredTask)}
            onTaskRemoved={(notRequiredTask) => task.removeDependency(notRequiredTask)}
          />

        </Box>

        <Box sm={12} lg={6} p={1}>

          <RelatedTasks
            title={'Required for'}
            tasks={task.getDependentTasks()}
            onTaskAdded={(requiredTask) => alert('added')}
            onTaskRemoved={(notRequiredTask) => alert('removed')}
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

