import React, { PropTypes, Component } from 'react';
import Layout from '../../layout/Layout';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ParticipantsView from './participants/participants.view';
import GuestsView from './guests/guests.view';
import FeaturesView from './features/features.view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as weddingActions from '../../core/actions/wedding.actions';
import * as actionBarActions from '../../core/actions/actionbar.actions';
import * as allSelectionActions from '../../core/actions/selection.actions';
import EditAction from '../../layout/LayoutBar/actions/EditAction';
import { selectWedding } from '../../core/selectors/wedding.selector';
import Wedding from '../../core/models/wedding.model';

const TAB_KEYS = {
  PARTICIPANTS: 0,
  GUESTS: 1,
  FEATURES: 2,
};

class WeddingPage extends Component {

  static propTypes = {
    weddingActions: PropTypes.object.isRequired,
    actionBarActions: PropTypes.object.isRequired,
    selectionActions: PropTypes.object.isRequired,
    wedding: PropTypes.instanceOf(Wedding).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: TAB_KEYS.PARTICIPANTS,
      isLoading: true,
      tabs: {},
    };
  }

  componentWillMount() {
    this.props.weddingActions.fetchWedding();
  }

  componentDidMount() {
    this.activateTab(TAB_KEYS.PARTICIPANTS);
  }

  onTabMount = (tabId) => ({ otherContextItems } = {}) => {
    this.state.tabs[tabId] = {
      menu: otherContextItems,
    };
  };

  activateTab = (tabToActivate) => {
    this.setState({
      activeTab: tabToActivate,
    }, this.invalidateAppBarMenu);
  };

  invalidateAppBarMenu = () => {
    const { menu } = this.state.tabs[this.state.activeTab];

    const buttonStyle = {
      display: 'inline-block',
      float: 'right',
    };

    this.props.actionBarActions.displayContextMenu(
      <div>
        <EditAction
          style={buttonStyle}
          onEditStarted={() => {
            this.props.weddingActions.startWeddingEdit();
            this.props.selectionActions.enableSelecting();
          }}
          onEditEnded={() => {
            this.props.weddingActions.submitWeddingEdit();
            this.props.selectionActions.disableSelecting();
          }}
        />
        <div style={buttonStyle}>
          {menu}
        </div>
      </div>
    );
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
            <ParticipantsView
              onMount={this.onTabMount(TAB_KEYS.PARTICIPANTS)}
            />
          </Tab>

          <Tab
            value={TAB_KEYS.GUESTS}
            icon={<FontIcon className="material-icons">people</FontIcon>}
            label="GUESTS"
          >
            <GuestsView
              onMount={this.onTabMount(TAB_KEYS.GUESTS)}
            />
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

export default connect((state) => ({
  wedding: selectWedding(state),
}), (dispatch) => ({
  actionBarActions: bindActionCreators(actionBarActions, dispatch),
  weddingActions: bindActionCreators(weddingActions, dispatch),
  selectionActions: bindActionCreators(allSelectionActions, dispatch),
}))(WeddingPage);
