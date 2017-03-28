import React, { Component, PropTypes } from 'react';
import Layout from '../../layout/Layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allTasksActions from '../../core/actions/task.actions';
import * as allModalActions from '../../core/actions/modal.actions';
import * as actionBarActions from '../../core/actions/actionbar.actions';
import * as allSelectionActions from '../../core/actions/selection.actions';
import { selectTasks, selectTimeline } from '../../core/selectors/tasks.selector';
import Immutable from 'immutable';
import DetailedContent from '../../components/DetailedContent';
import DetailedContextBar from '../../components/DetailedContextBar';
import ContentFilter from '../../components/ContentFilter';
import TitledDetails from '../../components/TitledDetails';
import TaskDetails from '../../components/TaskDetails';
import Timeline from '../../components/Timeline';
import TimelineModel from '../../core/models/timeline.model';
import TaskIcon from '../../components/TaskIcon';
import ResponsiveBox from '../../components/ResponsiveBox';
import { getCurrentTime } from '../../core/timer';
import toLower from 'lodash/toLower';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames/bind';
import styles from './timeline.page.pcss';
import { createNullTask } from '../../core/factories/task.factory';

const cx = classNames.bind(styles);

class TasksPage extends Component {

  static propTypes = {
    /**
     * Set internally via connect.
     */
    tasks: PropTypes.instanceOf(Immutable.List).isRequired,
    timeline: PropTypes.instanceOf(TimelineModel).isRequired,
    tasksActions: PropTypes.object.isRequired,
    actionBarActions: PropTypes.object.isRequired,
    selectionActions: PropTypes.object.isRequired,
    modalActions: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      selectedTask: createNullTask(),
      showDetails: false,
      taskNameQuery: null,
    };
  }

  componentWillMount = () => this.props.tasksActions.fetchTasks();

  componentWillReceiveProps(props) {
    if (!props.tasks.isEmpty() && !this.state.selectedTask) {
      this.selectTask(props.tasks.get(0));
    }
  }

  setShowDetails = (showDetails) => {
    this.setState({ showDetails });
  };

  filterTasks = (query) => {
    this.setState({
      taskNameQuery: query,
    });
  };

  taskNameFilter = (task) => {
    const { taskNameQuery } = this.state;
    const containsSearchText = toLower(task.name).includes(taskNameQuery);
    return isEmpty(taskNameQuery) || containsSearchText;
  };

  selectTask = (task) => this.setState({
    selectedTask: task,
    showDetails: true,
  });

  render() {
    const { timeline } = this.props;
    const { selectedTask } = this.state;

    const renderTaskDetails = () => selectedTask ?
      <TaskDetails
        blockClass={cx('timeline__task-details')}
        task={selectedTask}
        isEditable={false}
        bindControls={({ save }) => {
          this.saveTaskDetails = save;
        }}
      /> : <div />;

    const renderPastTask = (task) => <TaskIcon
      onSelect={() => this.selectTask(task)}
      m={1}
      selected={selectedTask === task}
      task={task}
    />;

    const renderFutureTask = (task) => <TaskIcon
      onSelect={() => this.selectTask(task)}
      m={1}
      selected={selectedTask === task}
      task={task}
    />;

    return (
      <Layout className={cx('timeline')}>
        <DetailedContextBar
          showDetails
          details={
            <TitledDetails
              title={this.state.selectedTask.name}
              onBack={() => this.setShowDetails(false)}
            />
          }
        >
          <ContentFilter onFilter={(query) => this.filterTasks(query)} />
        </DetailedContextBar>
        <ResponsiveBox>
          <DetailedContent
            showDetails={this.state.showDetails}
            details={renderTaskDetails()}
          >
            <Timeline
              atDate={getCurrentTime()}
              timeline={timeline.filteredBy(this.taskNameFilter)}
              renderPastTask={renderPastTask}
              renderFutureTask={renderFutureTask}
            />
          </DetailedContent>
        </ResponsiveBox>
      </Layout>
    );
  }

}

export default connect((state) => ({
  tasks: selectTasks(state),
  timeline: selectTimeline(state),
}), (dispatch) => ({
  actionBarActions: bindActionCreators(actionBarActions, dispatch),
  tasksActions: bindActionCreators(allTasksActions, dispatch),
  selectionActions: bindActionCreators(allSelectionActions, dispatch),
  modalActions: bindActionCreators(allModalActions, dispatch),
}))(TasksPage);

