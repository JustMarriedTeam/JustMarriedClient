import React, { PureComponent, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Immutable from 'immutable';

export default class RelatedTasks extends PureComponent {

  static propTypes = {
    tasks: PropTypes.instanceOf(Immutable.List).isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title, tasks } = this.props;

    return (
      <div>
        <h6>{title}</h6>
        <List>
          {
            tasks.map(
              (task) => <div key={task.id}>
                <ListItem
                  primaryText={task.name}
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
