import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as allPopupActions from '../../core/actions/popup.actions';
import PopupModel, { POPUP_ROLE } from '../../core/models/popup.model';

class Popup extends PureComponent {

  static propTypes = {
    popup: PropTypes.instanceOf(PopupModel).isRequired,
    confirmPopup: PropTypes.func.isRequired,
  };

  render() {
    const { popup, confirmPopup } = this.props;

    if (!popup.visible) {
      return <div />;
    }

    const POPUP_ROLE_MAPPING = {
      [POPUP_ROLE.ACKNOWLEDGE]: {
        actions: [
          <FlatButton
            label="Confirm"
            primary
            keyboardFocused
            onTouchTap={() => confirmPopup()}
          />,
        ],
      },
    }[popup.role];

    return (
      <Dialog
        title={popup.title}
        actions={POPUP_ROLE_MAPPING.actions}
        modal={false}
        open={popup.visible}
        onRequestClose={this.handleClose}
      >
        {popup.content}
      </Dialog>
    );
  }

}

export default connect((state) => ({
  popup: state.popup,
}), allPopupActions)(Popup);
