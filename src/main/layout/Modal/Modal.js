import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import * as allModalActions from '../../core/actions/modal.actions';
import ModalModel from '../../core/models/modal.model';

class Modal extends PureComponent {

  static propTypes = {
    modal: PropTypes.instanceOf(ModalModel).isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  render() {
    const { modal, closeModal } = this.props;

    if (!modal.open) {
      return <div />;
    }

    return (
      <Dialog
        title={modal.title}
        actions={modal.actions}
        modal={false}
        open={modal.open}
        onRequestClose={closeModal}
      >
        {modal.content}
      </Dialog>
    );
  }

}

export default connect((state) => ({
  modal: state.modal,
}), allModalActions)(Modal);
