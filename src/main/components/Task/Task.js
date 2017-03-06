import React, { PureComponent, PropTypes } from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import TaskModel from '../../core/models/task.model.js';

export default class Task extends PureComponent {

  static propTypes = {
    task: PropTypes.instanceOf(TaskModel).isRequired,
  };

  render() {
    const { task } = this.props;

    return (
      <Card>
        <CardMedia
          overlay={<CardTitle
            title={task.name}
            subtitle={task.description}
          />}
        >
          <img role="presentation" src="http://meetingking.com/wp-content/images/meetingking_tasks.png" />
        </CardMedia>
      </Card>
    );
  }

}
