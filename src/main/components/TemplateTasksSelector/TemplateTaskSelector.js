import React, { PureComponent, PropTypes } from 'react';
import TaskSelector from '../TaskSelector';
import TextBox from '../TextBox';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';
import {
  selectTasksImplicitlyRequiredFor,
  selectTasksExplicitlyRequiredFor,
  selectTasksNotRequiredForAnyOtherThanAmong,
} from '../../core/services/task.service';
import * as allTemplateTasksActions from '../../core/actions/templates.actions';
import { connect } from 'react-redux';

export class TemplateTaskSelector extends PureComponent {

  static propTypes = {
    templateTasks: PropTypes.instanceOf(Immutable.Seq.Set).isRequired,
    onTaskSelection: PropTypes.func.isRequired,

    /**
     * Set internally via connect
     */
    templateTasksActions: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      selectedTasks: new Immutable.Set(),
    };
  }

  componentWillMount() {
    this.props.templateTasksActions.fetchTemplateTasks();
  }

  handleTaskSelectionChange = (task, isSelected) => {
    if (isSelected) {
      this.setState((prevState) => ({
        selectedTasks: prevState.selectedTasks
          .union(selectTasksImplicitlyRequiredFor(task)).add(task),
      }));
    } else {
      this.setState((prevState) => ({
        selectedTasks: prevState.selectedTasks
          .subtract(selectTasksNotRequiredForAnyOtherThanAmong(
            task, prevState.selectedTasks).add(task)),
      }));
    }
  };

  render() {
    const { selectedTasks } = this.state;
    const { templateTasks } = this.props;

    return (
      <div>
        <TextBox>Select tasks to add to your wedding from the list below:</TextBox>
        <TaskSelector
          allItems={templateTasks}
          selectedItems={selectedTasks.toSetSeq()}
          onSelectionChange={this.handleTaskSelectionChange}
          selectNestedItemsFor={(item) => selectTasksExplicitlyRequiredFor(item)}
        />
      </div>
    );
  }

}

export default connect(
  (state) => ({
    templateTasks: state.templates.tasks.toSetSeq(),
  }), (dispatch) => ({
    templateTasksActions: bindActionCreators(allTemplateTasksActions, dispatch),
  })
)(TemplateTaskSelector);
