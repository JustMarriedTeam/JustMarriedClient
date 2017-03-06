import React, { PureComponent, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allEditingActions from '../../../../core/actions/editing.actions';
import classNames from 'classnames/bind';
import styles from './EditAction.pcss';

const cx = classNames.bind(styles);

class EditButton extends PureComponent {

  static propTypes = {
    isEditing: PropTypes.bool.isRequired,
    onEditsStarted: PropTypes.func,
    onEditsSubmitted: PropTypes.func.isRequired,
    onEditsCancelled: PropTypes.func.isRequired,
    editingActions: PropTypes.object.isRequired,
  };

  toggleEdit = () => {
    const {
      editingActions,
      isEditing,
      onEditsStarted,
      onEditsSubmitted,
    } = this.props;

    if (isEditing) {
      editingActions.submitEdits(onEditsSubmitted);
    } else {
      editingActions.startEdits(onEditsStarted);
    }
  };

  cancelEdit = () => {
    const {
      editingActions,
      onEditsCancelled } = this.props;

    editingActions.cancelEdits(onEditsCancelled);
  };

  render() {
    const { isEditing } = this.props;

    const renderCancelButton = () => <IconButton
      className={cx('cancel-button')}
      onTouchTap={() => this.cancelEdit()}
    >
      <FontIcon className="material-icons">cancel</FontIcon>
    </IconButton>;

    return (
      <div className={cx('edit-button')}>
        <IconButton
          onTouchTap={this.toggleEdit}
        >
          {
            this.props.isEditing
              ? <FontIcon className="material-icons">save</FontIcon>
              : <FontIcon className="material-icons">mode_edit</FontIcon>
          }
        </IconButton>
        {isEditing ? renderCancelButton() : null}
      </div>
    );
  }

}

export default connect((state) => ({
  isEditing: state.action.editing,
}), (dispatch) => ({
  editingActions: bindActionCreators(allEditingActions, dispatch),
}))(EditButton);
