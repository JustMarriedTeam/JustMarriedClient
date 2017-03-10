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

const cx = classNames.bind(styles);

class TaskDetails extends PureComponent {

  static propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    taskActions: PropTypes.object.isRequired,
    modalActions: PropTypes.object.isRequired,
  };

  render() {
    const { task } = this.props;

    return (
      <Flex wrap className={cx('task-details')} align="stretch" justify="space-around">

        <Box sm={12}>

          <img className={cx('task-details__image')} role="presentation" src="http://meetingking.com/wp-content/images/meetingking_tasks.png" />

          {task.description}

        </Box>

        <Box sm={12} lg={6} p={1}>

          <RelatedTasks title={'Depending on'} tasks={task.getRelated()} />

        </Box>

        <Box sm={12} lg={6} p={1}>

          <RelatedTasks title={'Required for'} tasks={task.getRelated()} />

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

