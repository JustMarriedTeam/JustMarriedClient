import React, { Component, PropTypes } from 'react';
import Layout from '../../layout/Layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allTasksActions from '../../core/actions/task.actions';
import * as allModalActions from '../../core/actions/modal.actions';
import * as actionBarActions from '../../core/actions/actionbar.actions';
import * as allSelectionActions from '../../core/actions/selection.actions';
import { selectTasks } from '../../core/selectors/tasks.selector';
import Immutable from 'immutable';
import DetailedContent from '../../components/DetailedContent';


class TasksPage extends Component {

  static propTypes = {
    /**
     * Set internally via connect.
     */
    tasks: PropTypes.instanceOf(Immutable.List).isRequired,
    tasksActions: PropTypes.object.isRequired,
    actionBarActions: PropTypes.object.isRequired,
    selectionActions: PropTypes.object.isRequired,
    modalActions: PropTypes.object.isRequired,
  };

  componentWillMount = () => this.props.tasksActions.fetchTasks();

  render() {

    const renderTaskDetails = () => {
      return <div>asfaff</div>
    };

    return (
      <Layout>

        <DetailedContent showDetails={true} details={renderTaskDetails()}>
          <div>task list</div>
        </DetailedContent>

      </Layout>
    );
  }

}

export default connect((state) => ({
  tasks: selectTasks(state),
}), (dispatch) => ({
  actionBarActions: bindActionCreators(actionBarActions, dispatch),
  tasksActions: bindActionCreators(allTasksActions, dispatch),
  selectionActions: bindActionCreators(allSelectionActions, dispatch),
  modalActions: bindActionCreators(allModalActions, dispatch),
}))(TasksPage);

