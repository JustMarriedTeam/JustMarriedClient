import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../../../core/store';
import { bindActionCreators } from 'redux';
import { submit, getFormValues, isInvalid } from 'redux-form';
import values from 'lodash/values';
import { createGuest } from '../../../core/factories/guest.factory';
import * as allGuestsActions from '../../../core/actions/guests.actions';
import { selectGuest } from '../../../core/selectors/guests.selector';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import GuestForm from './guest.form';
import Guest from '../../../core/models/guest.model';

export const GUEST_DISPLAY_TYPE = {
  EXISTING_GUEST: 'existing_guest',
  NEW_GUEST: 'new_guest',
};

class GuestDetails extends PureComponent {

  static propTypes = {
    displayType: PropTypes.oneOf(values(GUEST_DISPLAY_TYPE)).isRequired,
    guestsActions: PropTypes.object.isRequired,
    guestId: PropTypes.string,
    guest: PropTypes.instanceOf(Guest).isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleSubmit = (updatedGuest) => {
    const { displayType, guestsActions } = this.props;
    switch (displayType) {
      case GUEST_DISPLAY_TYPE.NEW_GUEST:
        guestsActions.addGuest(updatedGuest);
        break;
      case GUEST_DISPLAY_TYPE.EXISTING_GUEST:
        guestsActions.updateGuest(updatedGuest);
        break;
      default:
        throw new Error('Unsupported display type');
    }
    this.props.onClose(updatedGuest);
  };

  render() {
    const { invalid } = this.props;
    return (
      <Dialog
        title="User details"
        actions={<div>
          <FlatButton
            label="Cancel"
            keyboardFocused
            onTouchTap={this.handleClose}
          />
          <FlatButton
            label="Save"
            primary
            keyboardFocused
            disabled={invalid}
            onTouchTap={() => store.dispatch(submit('GuestForm'))}
          />
        </div>}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.handleClose}
      >
        <GuestForm
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
    guest: (() => {
      switch (props.displayType) {
        case GUEST_DISPLAY_TYPE.NEW_GUEST:
          return createGuest();
        case GUEST_DISPLAY_TYPE.EXISTING_GUEST:
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
