import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../../../core/store';
import { submit, isInvalid } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import GuestForm from './guest.form';

class GuestDetails extends PureComponent {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    guest: PropTypes.object,
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleSubmit = () => {
    // submit
    this.props.onClose();
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
          initialValues={this.props.guest}
        />
      </Dialog>
    );
  }

}

export default connect(
  state => ({
    invalid: isInvalid('GuestForm')(state),
  })
)(GuestDetails);
