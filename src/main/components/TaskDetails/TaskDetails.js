import React, { PureComponent, PropTypes } from 'react';
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
  selectTask,
  selectTasksDependingOn,
  selectTasksRequiredFor,
} from '../../core/selectors/tasks.selector';
import Immutable from 'immutable';

const cx = classNames.bind(styles);

class TaskDetails extends PureComponent {

  static propTypes = {
    taskId: PropTypes.string.isRequired,

    /*
     Set internally via connect.
     */
    task: PropTypes.instanceOf(Task).isRequired,
    dependingOnTasks: PropTypes.instanceOf(Immutable.List).isRequired,
    requiredForTasks: PropTypes.instanceOf(Immutable.List).isRequired,
    taskActions: PropTypes.object.isRequired,
    modalActions: PropTypes.object.isRequired,
  };

  render() {
    const { task, dependingOnTasks, requiredForTasks } = this.props;

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

          <RelatedTasks title={'Depending on'} tasks={dependingOnTasks} />

        </Box>

        <Box sm={12} lg={6} p={1}>

          <RelatedTasks title={'Required for'} tasks={requiredForTasks} />

        </Box>


      </Flex>
    );
  }

}

export default connect(
  (state, props) => {
    const { taskId } = props;
    return {
      task: selectTask(taskId)(state),
      dependingOnTasks: selectTasksRequiredFor(taskId)(state),
      requiredForTasks: selectTasksDependingOn(taskId)(state),
    };
  },
  (dispatch) => ({
    taskActions: bindActionCreators(allTaskActions, dispatch),
    modalActions: bindActionCreators(allModalActions, dispatch),
  })
)(TaskDetails);

