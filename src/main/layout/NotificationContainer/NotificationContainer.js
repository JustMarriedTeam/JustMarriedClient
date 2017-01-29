import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import * as notificationActions from '../../core/actions/notification.actions';

class NotificationContainer extends PureComponent {

  static propTypes = {
    notification: PropTypes.object.isRequired,
    clearNotification: PropTypes.func.isRequired,
  };

  render() {
    const { notification } = this.props;
    return (
      <Snackbar
        open={notification.visible}
        message={notification.message}
        autoHideDuration={2000}
        onRequestClose={this.props.clearNotification}
      />
    );
  }

}

export default connect((state) => ({
  notification: state.notification,
}), notificationActions)(NotificationContainer);
