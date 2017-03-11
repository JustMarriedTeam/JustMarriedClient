import React, {PureComponent, PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Immutable from 'immutable';

const ICONS_BY_STATUS = {
  done: 'done',
  pending: 'lock_open',
  blocked: 'lock_outline',
};

export default class RelatedTasks extends PureComponent {

  static propTypes = {
    tasks: PropTypes.instanceOf(Immutable.List).isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const {title, tasks} = this.props;

    return (
      <div>
        <h6>{title}</h6>
        <List>
          {
            tasks.map(
              (task) => <div key={task.id}>
                <ListItem
                  primaryText={task.name}
                  rightIcon={
                    <FontIcon
                      className="material-icons">{ ICONS_BY_STATUS[task.status] }</FontIcon>
                  }
                  leftIcon={<img
                    role="presentation"
                    src="http://meetingking.com/wp-content/images/meetingking_tasks.png"
                  />}
                />
              </div>
            )
          }
        </List>
      </div>
    );
  }

}
