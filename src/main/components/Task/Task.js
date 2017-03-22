import React, { PureComponent, PropTypes } from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import TaskModel, { TASK_STATUS } from '../../core/models/task.model.js';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import * as allModalActions from '../../core/actions/modal.actions';
import TaskDetails from '../TaskDetails/TaskDetails';
import { bindActionCreators } from 'redux';
import CloseModalFooter from '../../layout/Modal/footers/CloseModalFooter';
import TitleWithEditModalHeader from '../../layout/Modal/headers/TitleWithEditModalHeader';

class Task extends PureComponent {

  static propTypes = {
    task: PropTypes.instanceOf(TaskModel).isRequired,
    modalActions: PropTypes.object.isRequired,
  };

  openDetails = () => {
    const { task, modalActions } = this.props;

    const prepareMenu = () => {
      const itemArray = [];

      if (task.hasStatus(TASK_STATUS.PENDING)) {
        itemArray.push(<MenuItem key="makeDone" primaryText="Make done" />);
      } else if (task.hasStatus(TASK_STATUS.DONE)) {
        itemArray.push(<MenuItem key="makePending" primaryText="Make pending" />);
      }

      return itemArray;
    };

    modalActions.openModal({
      context: {
        isEditable: false,
      },
      header: <TitleWithEditModalHeader
        title={task.name}
        menuItems={prepareMenu()}
        onSave={() => this.saveTaskDetails()}
      />,
      content: (ctx) => <TaskDetails
        task={task}
        bindControls={({ save }) => { this.saveTaskDetails = save; }}
        isEditable={ctx.isEditable}
      />,
      footer: (ctx) => <CloseModalFooter
        canClose={!ctx.isEditable}
        onClose={() => modalActions.closeModal()}
      />,
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
