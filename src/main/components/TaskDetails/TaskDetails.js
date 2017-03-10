import React, { PureComponent, PropTypes } from 'react';
import { Flex, Box } from 'reflexbox';
import classNames from 'classnames/bind';
import styles from './TaskDetails.pcss';
import { connect } from 'react-redux';
import Task from '../../core/models/task.model';
import * as allTaskActions from '../../core/actions/task.actions';
import * as allModalActions from '../../core/actions/modal.actions';
import { bindActionCreators } from 'redux';

const cx = classNames.bind(styles);

class TaskDetails extends PureComponent {

  static propTypes = {
    taskId: PropTypes.string.isRequired,
    task: PropTypes.instanceOf(Task).isRequired,
    taskActions: PropTypes.object.isRequired,
    modalActions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Flex wrap className={cx('login-form')} align="stretch" justify="space-around">

        <Box sm={12} md={5} p={1}>

          <img role="presentation" src="http://meetingking.com/wp-content/images/meetingking_tasks.png" />

        </Box>

      </Flex>
    );
  }

}

export default connect(
  {

  },
  (dispatch) => ({
    taskActions: bindActionCreators(allTaskActions, dispatch),
    modalActions: bindActionCreators(allModalActions, dispatch),
  })
)(TaskDetails);

