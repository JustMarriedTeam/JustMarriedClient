import React, { PropTypes, PureComponent } from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class CloseModalFooter extends PureComponent {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    canClose: PropTypes.bool.isRequired,
  };

  render() {
    const { canClose, onClose } = this.props;

    return (<FlatButton
      onClick={onClose}
      disabled={!canClose}
      label="Close"
    />);
  }

}
