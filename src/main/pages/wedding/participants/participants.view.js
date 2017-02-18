import React, { PropTypes, PureComponent } from 'react';
import PrimaryParticipant from
  '../../../components/Participants/PrimaryParticipant/primary.participant';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as weddingActions from '../../../core/actions/wedding.actions';
import map from 'lodash/map';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { createGridCols, createGridBreakpoints, createLayouts } from '../../../core/grid';
import { selectParticipants } from '../../../core/selectors/participants.selector';
import Participant from '../../../core/models/participant.model';
const ResponsiveReactGridLayout = new WidthProvider(Responsive);

class ParticipantsView extends PureComponent {

  static generateGridMapping(participants) {
    return createLayouts(map(participants, (participant) => participant.role));
  }

  static propTypes = {
    participants: PropTypes.arrayOf(Participant).isRequired,
    weddingActions: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    onMount: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      layouts: ParticipantsView.generateGridMapping(props.participants),
      breakpoints: createGridBreakpoints(),
      cols: createGridCols(),
    };
  }

  componentWillReceiveProps(props) {
    const layouts = ParticipantsView.generateGridMapping(props.participants);
    this.setState({
      layouts,
    });
  }

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { participants } = this.props;

    return (<div>
      <ResponsiveReactGridLayout
        breakpoints={this.state.breakpoints}
        cols={this.state.cols}
        margin={[15, 15]}
        rowHeight={550}
        isDraggable={false}
        isResizable={false}
        layouts={this.state.layouts}
      >

        {
          map(participants, (participant) => (
            <div key={participant.role}>
              <PrimaryParticipant
                participant={participant}
              />
            </div>
          ))
        }

      </ResponsiveReactGridLayout>

    </div>);
  }

}

// https://github.com/reactjs/react-redux/blob/master/docs/api.md
export default connect((state) => ({
  isEditing: state.action.editing,
  participants: selectParticipants(state),
}), (dispatch) => ({
  weddingActions: bindActionCreators(weddingActions, dispatch),
}))(ParticipantsView);
