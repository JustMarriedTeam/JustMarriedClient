import React, {Component} from "react";
import Layout from "../../layout/Layout";
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

export default class TasksPage extends Component {

    render() {
        return (
            <Layout>
                <Tabs>
                    <Tab
                        icon={<FontIcon className="material-icons">view_compact</FontIcon>}
                        label="All"
                    />
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