import React, { Component } from 'react';
import Layout from '../../layout/Layout';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ParticipantsView from './participants/participants.view';
import GuestsView from './guests/guests.view';
import FeaturesView from './features/features.view';

const TAB_KEYS = {
  PARTICIPANTS: 0,
  GUESTS: 1,
  FEATURES: 2,
};

export default class WeddingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: TAB_KEYS.PARTICIPANTS,
    };
  }

  activateTab = (tabToActivate) => {
    this.setState({
      activeTab: tabToActivate,
    });
  };

  render() {
    return (
      <Layout>
        <Tabs
          onChange={this.activateTab}
          value={this.state.activeTab}
        >

          <Tab
            value={TAB_KEYS.PARTICIPANTS}
            icon={<FontIcon className="material-icons">star</FontIcon>}
            label="PARTICIPANTS"
          >
            <ParticipantsView />
          </Tab>

          <Tab
            value={TAB_KEYS.GUESTS}
            icon={<FontIcon className="material-icons">people</FontIcon>}
            label="GUESTS"
          >
            <GuestsView />
          </Tab>


          <Tab
            value={TAB_KEYS.FEATURES}
            icon={<FontIcon className="material-icons">build</FontIcon>}
            label="FEATURES"
          >
            <FeaturesView />
          </Tab>

        </Tabs>
      </Layout>
    );
  }

}
