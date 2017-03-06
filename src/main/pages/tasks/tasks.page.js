import React, { Component, PropTypes } from 'react';
import Layout from '../../layout/Layout';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import TaskGrid from '../../components/TaskGrid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as weddingActions from '../../core/actions/wedding.actions';
import * as actionBarActions from '../../core/actions/actionbar.actions';
import * as allSelectionActions from '../../core/actions/selection.actions';
import { selectTasks } from '../../core/selectors/tasks.selector';
import Immutable from 'immutable';

class TasksPage extends Component {

  static propTypes = {
    tasks: PropTypes.instanceOf(Immutable.List).isRequired,
    weddingActions: PropTypes.object.isRequired,
    actionBarActions: PropTypes.object.isRequired,
    selectionActions: PropTypes.object.isRequired,
  };

  componentWillMount = () => this.props.weddingActions.loadTasks();

  render() {
    return (
      <Layout>
        <Tabs>
          <Tab
            icon={<FontIcon className="material-icons">view_compact</FontIcon>}
            label="All"
          >

            <TaskGrid
              tasks={this.props.tasks}
            />

          </Tab>
          <Tab
            icon={<FontIcon className="material-icons">schedule</FontIcon>}
            label="Todo"
          />
          <Tab
            icon={<FontIcon className="material-icons">next_week</FontIcon>}
            label="Upcoming"
          />
        </Tabs>
      </Layout>
    );
  }

}

export default connect((state) => ({
  tasks: selectTasks(state),
}), (dispatch) => ({
  actionBarActions: bindActionCreators(actionBarActions, dispatch),
  weddingActions: bindActionCreators(weddingActions, dispatch),
  selectionActions: bindActionCreators(allSelectionActions, dispatch),
}))(TasksPage);

