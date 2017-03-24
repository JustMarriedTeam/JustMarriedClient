import React, {PropTypes, PureComponent} from 'react';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames/bind';
import styles from './TaskIcon.pcss';
import Task from '../../core/models/task.model';

const cx = classNames.bind(styles);

export default class TaskIcon extends PureComponent {

  static propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
  };

  render() {
    const {task} = this.props;

    return (
      <div className={cx('task-icon')}>
        <Avatar
          className={cx('task-icon__image')}
          src="https://placehold.it/128"
        />
        <div className={cx('task-icon__name')}>{task.name}</div>
      </div>
    );
  }

}
