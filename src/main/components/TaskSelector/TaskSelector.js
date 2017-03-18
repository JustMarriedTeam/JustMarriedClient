import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './TaskSelector.pcss';
import AutoComplete from 'material-ui/AutoComplete';
import Immutable from 'immutable';

const cx = classNames.bind(styles);

export default class TaskSelector extends PureComponent {

  static propTypes = {
    tasksToChooseFrom: PropTypes.instanceOf(Immutable.Seq).isRequired,
    onTaskSelection: PropTypes.func.isRequired,
  };

  static dataSourceConfig = {
    text: 'name',
    value: 'id',
  };

  focus() {
    setTimeout(() => this.textInput.focus(), 100);
  }

  render() {
    const { tasksToChooseFrom, onTaskSelection } = this.props;

    return (
      <AutoComplete
        hintText="Start typing"
        ref={(element) => { this.textInput = element; }}
        menuCloseDelay={50}
        dataSource={tasksToChooseFrom.toArray()}
        dataSourceConfig={TaskSelector.dataSourceConfig}
        onNewRequest={onTaskSelection}
      />
    );
  }

}
