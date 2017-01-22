import React, { PropTypes, Component } from 'react';
import Layout from '../../layout/Layout';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ParticipantsView from './participants/participants.view';
import GuestsView from './guests/guests.view';
import FeaturesView from './features/features.view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConditionalRenderer from '../../utils/ConditionalRenderer';
import * as weddingActions from '../../core/actions/wedding.actions';

const TAB_KEYS = {
  PARTICIPANTS: 0,
  GUESTS: 1,
  FEATURES: 2,
};

class WeddingPage extends Component {

  static propTypes = {
    weddingActions: PropTypes.object.isRequired,
    wedding: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: TAB_KEYS.PARTICIPANTS,
    };
  }

  componentDidMount() {
    this.props.weddingActions.fetchWedding();
  }

  activateTab = (tabToActivate) => {
    this.setState({
      activeTab: tabToActivate,
    });
  };

  render() {
    const { wedding } = this.props;
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
            <ConditionalRenderer show={this.state.activeTab === TAB_KEYS.PARTICIPANTS}>
              <ParticipantsView />
            </ConditionalRenderer>
          </Tab>

          <Tab
            value={TAB_KEYS.GUESTS}
            icon={<FontIcon className="material-icons">people</FontIcon>}
            label="GUESTS"
          >
            <ConditionalRenderer show={this.state.activeTab === TAB_KEYS.GUESTS}>
              <GuestsView guests={wedding.guests} />
            </ConditionalRenderer>
          </Tab>


          <Tab
            value={TAB_KEYS.FEATURES}
            icon={<FontIcon className="material-icons">build</FontIcon>}
            label="FEATURES"
          >
            <ConditionalRenderer show={this.state.activeTab === TAB_KEYS.FEATURES}>
              <FeaturesView />
            </ConditionalRenderer>
          </Tab>

        </Tabs>
      </Layout>
    );
  }

}

export default connect((state) => ({
  wedding: state.wedding,
}), (dispatch) => ({
  weddingActions: bindActionCreators(weddingActions, dispatch),
}))(WeddingPage);
