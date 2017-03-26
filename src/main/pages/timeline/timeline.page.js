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
import Timeline from '../../components/Timeline';
import TimelineModel from '../../core/models/timeline.model';
import TaskIcon from '../../components/TaskIcon';
import { getCurrentTime } from '../../core/timer';


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

  componentWillMount = () => this.props.tasksActions.fetchTasks();

  render() {
    const { timeline } = this.props;

    const renderTaskDetails = () => {
      return <div>asfaff</div>;
    };

    return (
      <Layout>

        <DetailedContent showDetails={true} details={renderTaskDetails()}>
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

