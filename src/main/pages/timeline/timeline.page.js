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
import TaskDetails from '../../components/TaskDetails';
import Timeline from '../../components/Timeline';
import TimelineModel from '../../core/models/timeline.model';
import TaskIcon from '../../components/TaskIcon';
import { getCurrentTime } from '../../core/timer';
import classNames from 'classnames/bind';
import styles from './timeline.page.pcss';

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
      selectedTask: null,
    };
  }

  componentWillMount = () => this.props.tasksActions.fetchTasks();

  componentWillReceiveProps(props) {
    if (!props.tasks.isEmpty() && !this.state.selectedTask) {
      this.setState({
        selectedTask: props.tasks.get(0),
      });
    }
  }

  render() {
    const { timeline } = this.props;

    const renderTaskDetails = () => this.state.selectedTask ?
      <TaskDetails
        blockClass={cx('timeline__task-details')}
        task={this.state.selectedTask}
        isEditable={false}
        bindControls={({ save }) => {
          this.saveTaskDetails = save;
        }}
      /> : <div />;

    return (
      <Layout className={cx('timeline')}>

        <DetailedContent
          showDetails={!!this.state.selectedTask}
          details={renderTaskDetails()}
        >
          <Timeline
            atDate={getCurrentTime()}
            timeline={timeline}
            renderPastTask={(task) => <TaskIcon task={task} />}
            renderFutureTask={(task) => <TaskIcon task={task} />}
          />
        </DetailedContent>

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

