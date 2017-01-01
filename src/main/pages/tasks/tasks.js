import React, { Component, PropTypes } from 'react';
import Layout from '../../layout/Layout';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import TaskGrid from '../../components/TaskGrid';
import TaskCollection from '../../core/models/task.collection.model';
import { connect } from 'react-redux';
import * as tasksActions from '../../core/actions/tasks.actions';

class TasksPage extends Component {

  static propTypes = {
    tasks: PropTypes.instanceOf(TaskCollection).isRequired,
    loadTasks: PropTypes.func.isRequired,
  };

  componentDidMount = () => this.props.loadTasks();

  render() {
    return (
      <Layout>
        <Tabs>
          <Tab
            icon={<FontIcon className="material-icons">view_compact</FontIcon>}
            label="All"
          >

            <TaskGrid
              tasks={[]}
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
  tasks: state.tasks,
}), tasksActions)(TasksPage);
