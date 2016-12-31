import React, { Component } from 'react';
import Layout from '../../layout/Layout';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import TaskGrid from '../../components/TaskGrid';
import _ from 'lodash/fp';

export default class TasksPage extends Component {

  constructor() {
    super();
    this.state = {
      items: _.map((name) => ({
        id: name,
        name,
      }))(['rings', 'church', 'best man', 'food', 'hotel', 'flowers']),
    };
  }

  render() {
    return (
      <Layout>
        <Tabs>
          <Tab
            icon={<FontIcon className="material-icons">view_compact</FontIcon>}
            label="All"
          >

            <TaskGrid
              tasks={this.state.items}
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
