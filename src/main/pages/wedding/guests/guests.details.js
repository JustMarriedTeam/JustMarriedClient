import React, { PropTypes, PureComponent } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class GuestDetails extends PureComponent {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    guest: PropTypes.object,
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Dialog
        title="Dialog With Date Picker"
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
            onTouchTap={this.handleClose}
          />
        </div>}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.handleClose}
      >
        <TextField
          hintText="First name"
          floatingLabelText="First name"
        /><br />
        <TextField
          hintText="Last name"
          floatingLabelText="Last name"
        /><br />
      </Dialog>
    );
  }

}
