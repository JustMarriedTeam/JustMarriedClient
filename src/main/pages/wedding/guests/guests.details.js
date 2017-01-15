import React, { PropTypes, PureComponent } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
        actions={<FlatButton
          label="Close"
          primary
          keyboardFocused
          onTouchTap={this.handleClose}
        />}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.handleClose}
      >
        Open a Date Picker dialog from within a dialog.

      </Dialog>
    );
  }

}
