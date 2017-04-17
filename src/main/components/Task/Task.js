import React, { PureComponent, PropTypes } from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import TaskModel, { TASK_STATUS } from '../../core/models/task.model.js';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import * as allModalActions from '../../core/actions/modal.actions';
import * as allTaskActions from '../../core/actions/task.actions';
import TaskDetails from '../TaskDetails/TaskDetails';
import { bindActionCreators } from 'redux';
import CloseModalFooter from '../../layout/Modal/footers/CloseModalFooter';
import TitleWithEditModalHeader from '../../layout/Modal/headers/TitleWithEditModalHeader';

class Task extends PureComponent {

  static propTypes = {
    task: PropTypes.instanceOf(TaskModel).isRequired,

    /**
     * Set internally via connect.
     */
    modalActions: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
  };

  openDetails = () => {
    const { task, modalActions, taskActions } = this.props;

    const prepareMenu = () => {
      const itemArray = [];

      if (task.hasStatus(TASK_STATUS.PENDING)) {
        itemArray.push(
          <MenuItem
            key="makeDone"
            onTouchTap={() => taskActions.changeStatus(task, TASK_STATUS.DONE)
              .then(modalActions.closeModal)}
            primaryText="Make done"
          />
        );
      } else if (task.hasStatus(TASK_STATUS.DONE)) {
        itemArray.push(
          <MenuItem
            key="makePending"
            onTouchTap={() => taskActions.changeStatus(task, TASK_STATUS.PENDING)
              .then(modalActions.closeModal)}
            primaryText="Make pending"
          />
        );
      }

      itemArray.push(
        <MenuItem
          key="delete"
          onTouchTap={() => taskActions.removeTask(task)
            .then(modalActions.closeModal)}
          primaryText="Remove"
        />
      );

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
        bindControls={({ save }) => {
          this.saveTaskDetails = save;
        }}
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

    const iconPath = `images/tasks/${task.icon}`;

    return (
      <Card onTouchTap={this.openDetails}>
        <CardMedia
          overlay={<CardTitle
            title={task.name}
            subtitle={task.description}
          />}
        >
          <img role="presentation" src={iconPath} />
        </CardMedia>
      </Card>
    );
  }

}

export default connect(
  () => ({}),
  (dispatch) => ({
    modalActions: bindActionCreators(allModalActions, dispatch),
    taskActions: bindActionCreators(allTaskActions, dispatch),
  })
)(Task);
