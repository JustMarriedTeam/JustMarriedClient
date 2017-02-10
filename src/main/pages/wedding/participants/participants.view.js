import React, { PropTypes, PureComponent } from 'react';
import PrimaryParticipant
  from '../../../components/Participants/PrimaryParticipant/primary.participant';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit, isInvalid } from 'redux-form';
import * as weddingActions from '../../../core/actions/wedding.actions';
import store from '../../../core/store';
import find from 'lodash/find';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import SavingError from '../../../core/errors/saving.error';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { createGridCols, createGridBreakpoints, createLayouts } from '../../../core/grid';

const ResponsiveReactGridLayout = new WidthProvider(Responsive);

const roleNamesMapping = {
  bride: 'Bride',
  groom: 'Groom',
  bridesmaid: 'Bridesmaid',
  bestMan: 'Best man',
};

class ParticipantsView extends PureComponent {

  static generateGridMapping(participants) {
    return createLayouts(map(participants, (participant) => participant.role));
  }

  static propTypes = {
    weddingActions: PropTypes.object.isRequired,
    participants: PropTypes.array.isRequired,
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
    this.props.onMount({
      onSubmit: (save) => {
        const roles = map(this.props.participants, (participant) => participant.role);
        const formNames = map(roles, (role) => `ParticipantForm_${role}`);
        const invalidForms = map(formNames, (name) => isInvalid(name)(store.getState()));
        if (!includes(invalidForms, true)) {
          forEach(formNames, (name) => store.dispatch(submit(name)));
          return save();
        } else { // eslint-disable-line
          throw new SavingError('Check your input');
        }
      },
    });
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
}), (dispatch) => ({
  weddingActions: bindActionCreators(weddingActions, dispatch),
}))(ParticipantsView);
