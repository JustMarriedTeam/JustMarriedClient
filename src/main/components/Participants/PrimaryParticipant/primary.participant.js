import React, { PureComponent, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import * as allWeddingActions from '../../../core/actions/wedding.actions';
import ParticipantForm from './participant.form';
import styles from './primary.participant.pcss';

const cx = classNames.bind(styles);

class PrimaryParticipant extends PureComponent {

  static propTypes = {
    weddingActions: PropTypes.object.isRequired,
    participant: PropTypes.object.isRequired,
    isEditing: PropTypes.bool,
  };

  render() {
    const {
      isEditing,
      participant,
      weddingActions } = this.props;

    return (
      <Paper className={cx('primary-participant')}>

        <Toggle
          className={cx('primary-participant__toggle')}
          disabled={!isEditing}
          toggled={participant.active}
          onToggle={() => weddingActions.toggleParticipant(participant)}
        />

        <Avatar
          className={cx('primary-participant__avatar')}
          size={250}
        >{participant.role}</Avatar>

        <ParticipantForm
          form={`ParticipantForm_${participant.role}`}
          initialValues={participant}
          isEditable={isEditing && participant.active}
          onSubmit={(details) => weddingActions.updateParticipant(details)}
        />

      </Paper>
    );
  }

}

export default connect((state) => ({
  isEditing: state.action.editing,
}), (dispatch) => ({
  weddingActions: bindActionCreators(allWeddingActions, dispatch),
}))(PrimaryParticipant);
