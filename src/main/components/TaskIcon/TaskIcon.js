import React, { PropTypes, PureComponent } from 'react';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames/bind';
import styles from './TaskIcon.pcss';
import Task from '../../core/models/task.model';
import withRobox from 'robox';
import pick from 'lodash/pick';
import noop from 'lodash/noop';

const cx = classNames.bind(styles);

class TaskIcon extends PureComponent {

  static propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    onSelect: PropTypes.func,
    selected: PropTypes.bool,
  };

  static defaultProps = {
    onSelect: noop,
  };

  render() {
    const { task, onSelect, selected } = this.props;

    const taskIconSrc = `/images/tasks/${task.icon}`;

    return (
      <div
        onClick={onSelect}
        {...pick(this.props, ['style', 'onClick'])}
        className={cx('task-icon', {
          'task-icon--selected': selected,
        })}
      >
        <Avatar
          className={cx('task-icon__image')}
          size={60}
          backgroundColor="#FFF"
          src={taskIconSrc}
        />
        <div className={cx('task-icon__name')}>{task.name}</div>
      </div>
    );
  }

}

export default withRobox(TaskIcon);
