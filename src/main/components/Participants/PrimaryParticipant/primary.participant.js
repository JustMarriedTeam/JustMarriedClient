import React, { PureComponent, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import * as allParticipantActions from '../../../core/actions/participant.actions';
import * as allFormActions from '../../../core/actions/form.actions';
import ParticipantForm from './participant.form';
import Participant from '../../../core/models/participant.model';
import styles from './primary.participant.pcss';

const cx = classNames.bind(styles);

class PrimaryParticipant extends PureComponent {

  static propTypes = {
    participantActions: PropTypes.object.isRequired,
    formActions: PropTypes.object.isRequired,
    participant: PropTypes.instanceOf(Participant).isRequired,
    isEditing: PropTypes.bool,
  };

  render() {
    const {
      isEditing,
      participant,
      participantActions,
      formActions,
    } = this.props;

    return (
      <Paper className={cx('primary-participant')}>

        <Toggle
          className={cx('primary-participant__toggle')}
          disabled={!isEditing}
          toggled={participant.active}
          onToggle={() => participantActions.toggleParticipant(participant)}
        />

        <Avatar
          className={cx('primary-participant__avatar')}
          size={250}
        >{participant.role}</Avatar>

        <ParticipantForm
          form={`ParticipantForm_${participant.role}`}
          initialValues={participant.toJS()}
          isEditable={isEditing && participant.active}
          onSubmit={(details) => {
            participantActions.updateParticipant(details);
            formActions.notifySubmitted(`ParticipantForm_${participant.role}`);
          }}
        />

      </Paper>
    );
  }

}

// http://somebody32.github.io/22 - though might not be necessary here
export default connect((state) => (({
  isEditing: state.action.editing,
})), (dispatch) => ({
  participantActions: bindActionCreators(allParticipantActions, dispatch),
  formActions: bindActionCreators(allFormActions, dispatch),
}))(PrimaryParticipant);
