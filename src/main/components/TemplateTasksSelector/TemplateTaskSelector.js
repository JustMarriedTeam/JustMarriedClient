import React, { PureComponent, PropTypes } from 'react';
import ItemSelector from '../ItemSelector';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';
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
        selectedTasks: prevState.selectedTasks.add(task),
      }));
    } else {
      this.setState((prevState) => ({
        selectedTasks: prevState.selectedTasks.delete(task),
      }));
    }
  };

  render() {
    const { selectedTasks } = this.state;
    const { templateTasks } = this.props;

    return (
      <ItemSelector
        allItems={templateTasks}
        selectedItems={selectedTasks.toSetSeq()}
        onSelectionChange={this.handleTaskSelectionChange}
      />
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
