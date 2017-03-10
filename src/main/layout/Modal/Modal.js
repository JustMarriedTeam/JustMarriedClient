import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import * as allModalActions from '../../core/actions/modal.actions';
import ModalModel from '../../core/models/modal.model';

class Modal extends PureComponent {

  static propTypes = {
    modal: PropTypes.instanceOf(ModalModel).isRequired,
    confirmPopup: PropTypes.func.isRequired,
  };

  render() {
    const { modal } = this.props;

    if (!modal.open) {
      return <div />;
    }

    return (
      <Dialog
        title={modal.title}
        actions={modal.actions}
        modal
        open={modal.open}
        onRequestClose={this.handleClose}
      >
        {popup.content}
      </Dialog>
    );
  }

}

export default connect((state) => ({
  modal: state.modal,
}), allModalActions)(Modal);
