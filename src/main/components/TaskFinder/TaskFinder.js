import React, { PureComponent, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Immutable from 'immutable';

export default class TaskFinder extends PureComponent {

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

  reset() {
    this.textInput.setState({ searchText: '' });
  }

  render() {
    const { tasksToChooseFrom, onTaskSelection } = this.props;

    return (
      <AutoComplete
        hintText="Start typing"
        ref={(element) => { this.textInput = element; }}
        menuCloseDelay={50}
        dataSource={tasksToChooseFrom.toArray()}
        dataSourceConfig={TaskFinder.dataSourceConfig}
        onNewRequest={onTaskSelection}
      />
    );
  }

}
