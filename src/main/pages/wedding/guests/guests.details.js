import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../../../core/store';
import { bindActionCreators } from 'redux';
import { submit, getFormValues, isInvalid } from 'redux-form';
import values from 'lodash/values';
import { createGuest } from '../../../core/factories/guest.factory';
import * as allGuestsActions from '../../../core/actions/guests.actions';
import { selectGuest } from '../../../core/selectors/guests.selector';
import { selectCurrentWeddingId } from '../../../core/selectors/wedding.selector';
import ConditionalRenderer from '../../../utils/ConditionalRenderer';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import GuestForm from './guest.form';
import Guest from '../../../core/models/guest.model';

export const GUEST_DISPLAY_TYPE = {
  DISPLAY_GUEST: 'DISPLAY_GUEST',
  EDIT_GUEST: 'EDIT_GUEST',
  ADD_NEW_GUEST: 'ADD_NEW_GUEST',
};

const BEHAVIOUR_MAPPINGS = {
  [GUEST_DISPLAY_TYPE.DISPLAY_GUEST]: {
    titleText: 'Guest details',
    closeText: 'close',
    isEditable: false,
    hasSubmitButton: false,
  },
  [GUEST_DISPLAY_TYPE.EDIT_GUEST]: {
    titleText: 'Edit guest details',
    closeText: 'cancel',
    hasSubmitButton: true,
    submitText: 'save',
    isEditable: true,
  },
  [GUEST_DISPLAY_TYPE.ADD_NEW_GUEST]: {
    titleText: 'Add new guest',
    closeText: 'cancel',
    hasSubmitButton: true,
    submitText: 'add',
    isEditable: true,
  },
};

class GuestDetails extends PureComponent {

  static propTypes = {
    displayType: PropTypes.oneOf(values(GUEST_DISPLAY_TYPE)).isRequired,
    guestsActions: PropTypes.object.isRequired,
    guestId: PropTypes.string,
    weddingId: PropTypes.string.isRequired,
    guest: PropTypes.instanceOf(Guest).isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleSubmit = (guest) => {
    const { displayType, guestsActions, weddingId } = this.props;
    switch (displayType) {
      case GUEST_DISPLAY_TYPE.ADD_NEW_GUEST:
        guestsActions.addGuest({
          guest,
          weddingId,
        });
        break;
      case GUEST_DISPLAY_TYPE.EDIT_GUEST:
        guestsActions.updateGuest(guest);
        break;
      default:
        throw new Error('Unsupported display type');
    }
    this.props.onClose(guest);
  };

  render() {
    const { invalid, displayType } = this.props;
    return (
      <Dialog
        title={BEHAVIOUR_MAPPINGS[displayType].titleText}
        actions={<div>
          <FlatButton
            label={BEHAVIOUR_MAPPINGS[displayType].closeText}
            primary={!BEHAVIOUR_MAPPINGS[displayType].hasSubmitButton}
            keyboardFocused
            onTouchTap={this.handleClose}
          />
          <ConditionalRenderer show={BEHAVIOUR_MAPPINGS[displayType].hasSubmitButton}>
            <FlatButton
              label={BEHAVIOUR_MAPPINGS[displayType].submitText || 'dummy'}
              primary
              keyboardFocused
              disabled={invalid}
              onTouchTap={() => store.dispatch(submit('GuestForm'))}
            />
          </ConditionalRenderer>
        </div>}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.handleClose}
      >
        <GuestForm
          disabled={BEHAVIOUR_MAPPINGS[displayType].isEditable}
          onSubmit={this.handleSubmit}
          initialValues={this.props.guest.toJS()}
        />
      </Dialog>
    );
  }

}

export default connect(
  (state, props) => ({
    values: getFormValues('GuestForm')(state),
    invalid: isInvalid('GuestForm')(state),
    weddingId: selectCurrentWeddingId(state),
    guest: (() => {
      switch (props.displayType) {
        case GUEST_DISPLAY_TYPE.ADD_NEW_GUEST:
          return createGuest();
        case GUEST_DISPLAY_TYPE.EDIT_GUEST:
        case GUEST_DISPLAY_TYPE.DISPLAY_GUEST:
          return selectGuest(props.guestId)(state);
        default:
          throw new Error('Unsupported display type');
      }
    })(),
  }),
  (dispatch) => ({
    guestsActions: bindActionCreators(allGuestsActions, dispatch),
  })
)(GuestDetails);
