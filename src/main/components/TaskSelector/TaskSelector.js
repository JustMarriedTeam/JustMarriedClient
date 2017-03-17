import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './TaskSelector.pcss';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import { selectAllTasks } from '../../core/selectors/tasks.selector';
import Immutable from 'immutable';

const cx = classNames.bind(styles);

class TaskSelector extends PureComponent {

  static propTypes = {
    onTaskSelection: PropTypes.func.isRequired,

    /*
     Set internally via connect.
     */
    tasks: PropTypes.instanceOf(Immutable.List).isRequired,
  };

  static dataSourceConfig = {
    text: 'name',
    value: 'id',
  };

  render() {
    const { tasks, onTaskSelection } = this.props;

    return (
      <AutoComplete
        hintText="Start typing"
        dataSource={tasks.toArray()}
        dataSourceConfig={TaskSelector.dataSourceConfig}
        onNewRequest={onTaskSelection}
      />
    );
  }

}

export default connect(
  (state) => ({
    tasks: selectAllTasks(state),
  }),
  () => ({})
)(TaskSelector);

