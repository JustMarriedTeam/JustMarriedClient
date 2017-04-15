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
import { createNullTask } from '../../core/factories/task.factory';
import EmptyContentPlaceholder from '../../components/EmptyContentPlaceholder';
import Scroll from 'react-scroll';

const ScrollToElement = Scroll.Element;
const scroller = Scroll.scroller;

class TasksPage extends Component {

  static propTypes = {
    /**
     * Set internally via connect.
     */
    tasks: PropTypes.instanceOf(Immutable.List),
    timeline: PropTypes.instanceOf(TimelineModel),
    tasksActions: PropTypes.object,
    actionBarActions: PropTypes.object,
    selectionActions: PropTypes.object,
    modalActions: PropTypes.object,
    browser: PropTypes.object,
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
      // this.selectTask(props.tasks.get(0));
      // this.setShowDetails(false);
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

  selectTask = (task) => {
    this.setState({
      selectedTask: task,
      showDetails: true,
    });

    if (this.props.browser.greaterThan.sm) {
      scroller.scrollTo(this.state.selectedTask.id, {
        duration: 100,
        delay: 10,
        smooth: true,
      });
    }
  };

  render() {
    const { timeline } = this.props;
    const { selectedTask } = this.state;

    const renderTaskDetails = () => selectedTask ? // eslint-disable-line
      <TaskDetails
        task={selectedTask}
        isEditable={false}
        onRelatedTaskSelected={(task) => this.selectTask(task)}
        bindControls={({ save }) => {
          this.saveTaskDetails = save;
        }}
      /> : <div />;

    const renderPastTask = (task) =>
      <ScrollToElement name={task.id}>
        <TaskIcon
          onSelect={() => this.selectTask(task)}
          m={1}
          selected={selectedTask === task}
          task={task}
        />
      </ScrollToElement>;

    const renderFutureTask = (task) =>
      <ScrollToElement name={task.id}>
        <TaskIcon
          onSelect={() => this.selectTask(task)}
          m={1}
          selected={selectedTask === task}
          task={task}
        />
      </ScrollToElement>;

    const renderEmptyPlaceholder = () => <EmptyContentPlaceholder>You must schedule
      at least one task to see time relations</EmptyContentPlaceholder>;

    const renderContent = () => <div>
      <DetailedContextBar
        showDetails={this.state.showDetails}
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
    </div>;

    return (
      <Layout>

        {
          timeline.isAvailable()
            ? renderContent()
            : renderEmptyPlaceholder()
        }


      </Layout>
    );
  }

}

export default connect((state) => ({
  tasks: selectTasks(state),
  timeline: selectTimeline(state),
  browser: state.browser,
}), (dispatch) => ({
  actionBarActions: bindActionCreators(actionBarActions, dispatch),
  tasksActions: bindActionCreators(allTasksActions, dispatch),
  selectionActions: bindActionCreators(allSelectionActions, dispatch),
  modalActions: bindActionCreators(allModalActions, dispatch),
}))(TasksPage);

