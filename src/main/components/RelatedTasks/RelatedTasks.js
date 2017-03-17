import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import SectionHeader from '../SectionHeader';
import ExpandableIconElement from '../ExpandableIconElement';
import TaskSelector from '../TaskSelector';
import Immutable from 'immutable';

const ICONS_BY_STATUS = {
  done: 'done',
  pending: 'schedule',
  blocked: 'lock_outline',
};

export default class RelatedTasks extends Component {

  static propTypes = {
    tasks: PropTypes.instanceOf(Immutable.List).isRequired,
    title: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      addingTask: false,
    };
  }

  toggleAddTask() {
    this.setState((prevState) => ({
      addingTask: !prevState.addingTask,
    }));
  }

  render() {
    const { title, tasks } = this.props;

    const renderTaskListItems = () => tasks.map(
      (task) => <div key={task.id}>
        <ListItem
          primaryText={task.name}
          rightIcon={
            <FontIcon
              className="material-icons"
            >{ICONS_BY_STATUS[task.status]}</FontIcon>
          }
          leftIcon={<img
            role="presentation"
            src="http://meetingking.com/wp-content/images/meetingking_tasks.png"
          />}
        />
      </div>
    );

    const renderTaskAddInput = () => <ExpandableIconElement
      expanded={this.state.addingTask}
      icon={<FontIcon
        onClick={() => this.toggleAddTask()}
        className="material-icons"
      >{this.state.addingTask ? 'cancel' : 'add'}</FontIcon>}
    >
      <TaskSelector />
    </ExpandableIconElement>;

    return (
      <div>
        <SectionHeader
          title={title}
          rightIcon={renderTaskAddInput()}
        />
        <List>
          {
            tasks.size > 0 ? renderTaskListItems() : <ListItem>None</ListItem>
          }
        </List>
      </div>
    );
  }

}
