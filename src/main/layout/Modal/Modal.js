import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as allModalActions from '../../core/actions/modal.actions';
import ModalModel from '../../core/models/modal.model';

export const DEFAULT_ACTIONS = {
  CLOSE_ACTION(actions) {
    return (<FlatButton
      onClick={() => actions.closeModal()}
      label="Close"
    />);
  },
};

class Modal extends PureComponent {

  static propTypes = {
    modal: PropTypes.instanceOf(ModalModel).isRequired,
    modalActions: PropTypes.object.isRequired,
  };

  render() {
    const { modal, modalActions } = this.props;

    if (!modal.open) {
      return <div />;
    }

    return (
      <Dialog
        title={modal.title}
        actions={React.isValidElement(modal.actions) ? modal.actions : modal.actions(modalActions)}
        modal={false}
        autoScrollBodyContent
        open={modal.open}
        onRequestClose={modalActions.closeModal}
      >
        {modal.content}
      </Dialog>
    );
  }

}

export default connect((state) => ({
  modal: state.modal,
}), (dispatch) => ({
  modalActions: bindActionCreators(allModalActions, dispatch),
}))(Modal);
