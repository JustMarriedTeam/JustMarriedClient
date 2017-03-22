import React, { Component, PropTypes } from 'react';
import Layout from '../../layout/Layout';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import TaskGrid from '../../components/TaskGrid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allTasksActions from '../../core/actions/task.actions';
import * as allModalActions from '../../core/actions/modal.actions';
import * as actionBarActions from '../../core/actions/actionbar.actions';
import * as allSelectionActions from '../../core/actions/selection.actions';
import { selectTasks } from '../../core/selectors/tasks.selector';
import { Menu, MainButton, ChildButton } from 'react-mfb';
import Immutable from 'immutable';
import TitleModalHeader from '../../layout/Modal/headers/TitleModalHeader';
import CreateOrCancelModalFooter from '../../layout/Modal/footers/CreateOrCancelModalFooter';
import { TASK_STATUS } from '../../core/models/task.model';

// better use selectors... they cache...
const TABS = {
  DONE: {
    key: 0,
    filter: (tasks) => tasks.filter((task) => task.hasStatus(TASK_STATUS.DONE)),
  },
  TODO: {
    key: 1,
    filter: (tasks) => tasks.filter((task) => task.hasStatus(TASK_STATUS.PENDING)),
  },
  UPCOMING: {
    key: 2,
    filter: (tasks) => tasks.filter((task) => task.hasStatus(TASK_STATUS.BLOCKED)),
  },
};

class TasksPage extends Component {

  static propTypes = {
    /**
     * Set internally via connect.
     */
    tasks: PropTypes.instanceOf(Immutable.List).isRequired,
    tasksActions: PropTypes.object.isRequired,
    actionBarActions: PropTypes.object.isRequired,
    selectionActions: PropTypes.object.isRequired,
    modalActions: PropTypes.object.isRequired,
  };

  componentWillMount = () => this.props.tasksActions.fetchTasks();

  handleAddingTask = () => {
    const { modalActions } = this.props;

    modalActions.openModal({
      context: {
        isEditable: false,
      },
      header: <TitleModalHeader
        title="Add new task"
      />,
      content: () => <div>Hello!</div>,
      footer: () => <CreateOrCancelModalFooter
        onCreate={() => alert('create')}
      />,
    });
  };

  render() {
    return (
      <Layout>
        <Tabs>
          <Tab
            icon={<FontIcon className="material-icons">schedule</FontIcon>}
            label="Todo"
            value={TABS.TODO.key}
          >

            <TaskGrid
              tasks={TABS.TODO.filter(this.props.tasks)}
            />

          </Tab>

          <Tab
            icon={<FontIcon className="material-icons">lock_open</FontIcon>}
            label="Upcoming"
            value={TABS.UPCOMING.key}
          >

            <TaskGrid
              tasks={TABS.UPCOMING.filter(this.props.tasks)}
            />

          </Tab>

          <Tab
            icon={<FontIcon className="material-icons">lock_outline</FontIcon>}
            label="Done"
            value={TABS.DONE.key}
          >

            <TaskGrid
              tasks={TABS.DONE.filter(this.props.tasks)}
            />

          </Tab>
        </Tabs>

        <Menu effect="zoomin" method="click" position="br">
          <MainButton
            iconResting="ion-plus"
            iconActive="ion-plus"
          />
          <ChildButton
            icon="ion-calendar"
            label="Add new task"
            onClick={() => this.handleAddingTask()}
          />
        </Menu>

      </Layout>
    );
  }

}

export default connect((state) => ({
  tasks: selectTasks(state),
}), (dispatch) => ({
  actionBarActions: bindActionCreators(actionBarActions, dispatch),
  tasksActions: bindActionCreators(allTasksActions, dispatch),
  selectionActions: bindActionCreators(allSelectionActions, dispatch),
  modalActions: bindActionCreators(allModalActions, dispatch),
}))(TasksPage);

