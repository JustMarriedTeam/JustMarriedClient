import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import SectionHeader from '../SectionHeader';
import ExpandableIconElement from '../ExpandableIconElement';
import TaskSelector from '../TaskSelector';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Task from '../../core/models/task.model';
import ConditionalRenderer from '../../utils/ConditionalRenderer';

const ICONS_BY_STATUS = {
  done: 'done',
  pending: 'schedule',
  blocked: 'lock_outline',
};

const focusElement = (element) => {
  if (element) {
    element.focus();
  }
};

class RelatedTasks extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    isEditable: PropTypes.bool,
    toTask: PropTypes.instanceOf(Task).isRequired,
    relatedTasksSelector: PropTypes.func.isRequired,
    unrelatedTasksSelector: PropTypes.func.isRequired,
    onTaskAdded: PropTypes.func.isRequired,
    onTaskRemoved: PropTypes.func.isRequired,

    /**
     * Set internally by connect.
     */
    relatedTasks: PropTypes.instanceOf(Immutable.Seq).isRequired,
    unrelatedTasks: PropTypes.instanceOf(Immutable.Seq).isRequired,
  };

  constructor() {
    super();
    this.state = {
      addingTask: false,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.addingTask) {
      this.taskSelector.focus();
    }
  }

  toggleAddTask = () => {
    this.setState((prevState) => ({
      addingTask: !prevState.addingTask,
    }));
  };

  handleTaskAdded = (addedTask) => {
    this.props.onTaskAdded(addedTask);
    this.taskSelector.reset();
  };

  render() {
    const { isEditable, title, relatedTasks, unrelatedTasks } = this.props;

    const renderTaskListItems = () => {
      const renderTaskRightIcon = (relatedTask) => isEditable
          ? <FontIcon
            onClick={() => this.props.onTaskRemoved(relatedTask)}
            className="material-icons"
          >remove</FontIcon>
          : <FontIcon
            className="material-icons"
          >{ICONS_BY_STATUS[relatedTask.status]}</FontIcon>;

      return relatedTasks.map(
        (relatedTask) => <div key={relatedTask.id}>
          <ListItem
            primaryText={relatedTask.name}
            rightIcon={renderTaskRightIcon(relatedTask)}
            leftIcon={<img
              role="presentation"
              src="http://meetingking.com/wp-content/images/meetingking_tasks.png"
            />}
          />
        </div>
      );
    };

    const renderTaskAddInput = () =>
      <ConditionalRenderer show={isEditable}>
        <ExpandableIconElement
          expanded={this.state.addingTask}
          icon={<FontIcon
            onClick={() => this.toggleAddTask()}
            className="material-icons"
          >{this.state.addingTask ? 'cancel' : 'add'}</FontIcon>}
        >
          <TaskSelector
            ref={(taskSelector) => { this.taskSelector = taskSelector; }}
            tasksToChooseFrom={unrelatedTasks}
            onTaskSelection={(task) => this.handleTaskAdded(task)}
          />
        </ExpandableIconElement>
      </ConditionalRenderer>;

    return (
      <div>
        <SectionHeader
          title={title}
          hideTitle={this.state.addingTask}
          rightIcon={renderTaskAddInput()}
        />
        <List>
          {
            relatedTasks.size > 0 ? renderTaskListItems() : <ListItem>None</ListItem>
          }
        </List>
      </div>
    );
  }

}

export default connect(
  (state, props) => ({
    relatedTasks: props.relatedTasksSelector(props.toTask)(state),
    unrelatedTasks: props.unrelatedTasksSelector(props.toTask)(state),
  }),
  () => ({})
)(RelatedTasks);

