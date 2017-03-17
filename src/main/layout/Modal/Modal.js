import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import * as allModalActions from '../../core/actions/modal.actions';
import ModalModel from '../../core/models/modal.model';

class Modal extends PureComponent {

  static propTypes = {
    modal: PropTypes.instanceOf(ModalModel).isRequired,
    modalActions: PropTypes.object.isRequired,
  };

  renderElement = (candidate) => React.isValidElement(candidate)
      ? candidate : candidate(this.props.modal.context);

  render() {
    const { modal, modalActions } = this.props;
    const { open, header, footer, content } = modal;

    if (!modal.open) {
      return <div />;
    }

    return (
      <Dialog
        title={this.renderElement(header)}
        actions={this.renderElement(footer)}
        modal={false}
        autoScrollBodyContent
        open={open}
        onRequestClose={modalActions.closeModal}
      >
        {this.renderElement(content)}
      </Dialog>
    );
  }

}

export default connect((state) => ({
  modal: state.modal,
}), (dispatch) => ({
  modalActions: bindActionCreators(allModalActions, dispatch),
}))(Modal);
