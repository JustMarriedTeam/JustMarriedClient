import React, { PropTypes, PureComponent } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allModalActions from '../../../core/actions/modal.actions';

class CreateOrCancelModalFooter extends PureComponent {

  static propTypes = {
    onCreate: PropTypes.func.isRequired,

    /**
     * Set internally via connect.
     */
    modalActions: PropTypes.object.isRequired,
  };

  render() {
    const { onCreate, modalActions } = this.props;

    return (<div>
      <FlatButton
        onClick={modalActions.closeModal}
        label="Cancel"
      />
      <RaisedButton
        onClick={onCreate}
        primary
        label="Create"
      />
    </div>);
  }

}

export default connect((state) => ({
  modalContext: state.modal.context,
}), (dispatch) => ({
  modalActions: bindActionCreators(allModalActions, dispatch),
}))(CreateOrCancelModalFooter);

