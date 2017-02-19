import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as allPopupActions from '../../core/actions/popup.actions';
import PopupModel, { POPUP_ROLE } from '../../core/models/popup.model';

import styles from './Popup.pcss';

const cx = classnames.bind(styles);

class Popup extends PureComponent {

  static propTypes = {
    popup: PropTypes.instanceOf(PopupModel).isRequired,
  };

  render() {
    const { popup } = this.props;

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
            onTouchTap={this.handleClose}
          />,
        ],
      },
    }[popup.role];

    return (
      <Dialog
        className={cx('popup')}
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
