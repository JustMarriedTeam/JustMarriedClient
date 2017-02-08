import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import Snackbar from 'material-ui/Snackbar';
import { ALERT_TYPE } from '../../core/models/alert.model';
import * as alertActions from '../../core/actions/alert.actions';

import styles from './Alert.pcss';

const cx = classnames.bind(styles);

class Alert extends PureComponent {

  static propTypes = {
    alert: PropTypes.object.isRequired,
    clearAlert: PropTypes.func.isRequired,
  };

  render() {
    const { alert } = this.props;
    return (
      <Snackbar
        open={alert.visible}
        message={alert.message}
        autoHideDuration={2000}
        onRequestClose={this.props.clearAlert}
        className={cx({
          'alert--success': alert.type === ALERT_TYPE.SUCCESS,
          'alert--warning': alert.type === ALERT_TYPE.WARNING,
          'alert--error': alert.type === ALERT_TYPE.ERROR,
        })}
      />
    );
  }

}

export default connect((state) => ({
  alert: state.alert,
}), alertActions)(Alert);
