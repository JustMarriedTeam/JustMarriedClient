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
    onEditStarted: PropTypes.func,
    onEditEnded: PropTypes.func.isRequired,
    editingActions: PropTypes.object.isRequired,
  };

  toggleEdit = () => {
    const {
      editingActions,
      isEditing,
      onEditStarted,
      onEditEnded,
    } = this.props;

    if (isEditing) {
      editingActions.endEditing(onEditEnded);
    } else {
      editingActions.startEditing(onEditStarted);
    }
  };

  render() {
    return (
      <IconButton
        className={cx('edit-button', {
          'edit-button--active': this.props.isEditing,
        })}
        onTouchTap={this.toggleEdit}
      >
        {
          this.props.isEditing
            ? <FontIcon className="material-icons">save</FontIcon>
            : <FontIcon className="material-icons">mode_edit</FontIcon>
        }
      </IconButton>
    );
  }

}

export default connect((state) => ({
  isEditing: state.action.editing,
}), (dispatch) => ({
  editingActions: bindActionCreators(allEditingActions, dispatch),
}))(EditButton);