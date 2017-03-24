import React, { PropTypes, PureComponent } from 'react';
import Task from '../../core/models/task.model';

export default class TaskIcon extends PureComponent {

  static propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
  };

  render() {
    const { task } = this.props;

    return (
      <div>
        {task.name}
      </div>
    );
  }

}
