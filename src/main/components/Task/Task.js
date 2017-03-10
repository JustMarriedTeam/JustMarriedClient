import React, { PureComponent, PropTypes } from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import TaskModel from '../../core/models/task.model.js';
import { connect } from 'react-redux';
import * as allModalActions from '../../core/actions/modal.actions';
import TaskDetails from '../TaskDetails/TaskDetails';
import { bindActionCreators } from 'redux';

class Task extends PureComponent {

  static propTypes = {
    task: PropTypes.instanceOf(TaskModel).isRequired,
    modalActions: PropTypes.object.isRequired,
  };

  openDetails = () => {
    const { task, modalActions } = this.props;
    modalActions.openModal({
      title: task.name,
      actions: <div>abc</div>,
      content: <TaskDetails taskId={task.id} />,
    });
  };

  render() {
    const { task } = this.props;

    return (
      <Card onTouchTap={this.openDetails}>
        <CardMedia
          overlay={<CardTitle
            title={task.name}
            subtitle={task.description}
          />}
        >
          <img role="presentation" src="http://meetingking.com/wp-content/images/meetingking_tasks.png" />
        </CardMedia>
      </Card>
    );
  }

}

export default connect(
  () => ({}),
  (dispatch) => ({
    modalActions: bindActionCreators(allModalActions, dispatch),
  })
)(Task);
