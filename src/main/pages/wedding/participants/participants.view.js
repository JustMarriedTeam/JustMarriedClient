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
import includes from 'lodash/includes';
import SavingError from '../../../core/errors/saving.error';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { createGridCols, createGridBreakpoints, createLayouts } from '../../../core/grid';

const ResponsiveReactGridLayout = new WidthProvider(Responsive);

class ParticipantsView extends PureComponent {

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

  componentDidMount(props) {
    this.props.onMount({
      onSubmit() {
        const roles = map(props.participants, (participant) => participant.role);
        const formNames = map(roles, (role) => `ParticipantForm_${role}`);
        const invalidForms = map(formNames, (name) => isInvalid(name)(store.getState()));
        if (!includes(invalidForms, true)) {
          store.dispatch(submit(formNames));
        } else {
          throw new SavingError('Check your input');
        }
      },
    });
  }

  static generateGridMapping(participants) {
    return createLayouts(map(participants, (participant) => participant.role));
  }

  render() {
    const { isEditing, participants } = this.props;

    const roleNamesMapping = {
      bride: 'Bride',
      groom: 'Groom',
      bridesmaid: 'Bridesmaid',
      bestMan: 'Best man',
      motherOfBride: 'Mother of Bride',
      fatherOfBride: 'Father of Bride',
      motherOfGroom: 'Mother of Groom',
      fatherOfGroom: 'Father of Groom',
    };

    const renderParticipant = (role, roleName) => <PrimaryParticipant
      form={`ParticipantForm_${role}`}
      onSubmit={(details) => this.props.weddingActions.updateParticipant(details)}
      isEditable={isEditing}
      participantRole={role}
      participantRoleName={roleName}
      initialValues={find(participants, { role })}
    />;

    return (<ResponsiveReactGridLayout
      breakpoints={this.state.breakpoints}
      cols={this.state.cols}
      margin={[15, 15]}
      rowHeight={500}
      isDraggable={false}
      isResizable={false}
      layouts={this.state.layouts}
    >

      {
        map(participants, (participant) => (
          <div key={participant.role}>
            {renderParticipant(participant.role, roleNamesMapping[participant.role])}
          </div>
        ))
      }

    </ResponsiveReactGridLayout>);
  }

}

// https://github.com/reactjs/react-redux/blob/master/docs/api.md
export default connect((state) => ({
  isEditing: state.action.editing,
}), (dispatch) => ({
  weddingActions: bindActionCreators(weddingActions, dispatch),
}))(ParticipantsView);
