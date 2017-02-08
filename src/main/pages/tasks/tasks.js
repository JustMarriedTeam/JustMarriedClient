import React, { Component, PropTypes } from 'react';
import Layout from '../../layout/Layout';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import TaskGrid from '../../components/TaskGrid';
import { connect } from 'react-redux';
import * as weddingActions from '../../core/actions/wedding.actions';

class TasksPage extends Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
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
  tasks: state.wedding.tasks,
}), weddingActions)(TasksPage);
