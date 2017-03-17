import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import SectionHeader from '../SectionHeader';
import IconButton from 'material-ui/IconButton';
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
      editing: false,
    };
  }

  toggleEditing() {
    this.setState((prevState) => ({
      editing: !prevState.editing,
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

    return (
      <div>
        <SectionHeader
          title={title}
          rightIcon={
            <IconButton>
              <FontIcon
                onClick={() => this.toggleEditing()}
                className="material-icons"
              >{ this.state.editing ? 'save' : 'edit'}</FontIcon>
            </IconButton>}
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
