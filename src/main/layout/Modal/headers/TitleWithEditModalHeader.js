import React, { PropTypes, PureComponent } from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allModalActions from '../../../core/actions/modal.actions';
import classNames from 'classnames/bind';
import styles from './TitleWithEditModalHeader.pcss';

const cx = classNames.bind(styles);

class TitleWithEditModalHeader extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    onEdit: PropTypes.func,
    onSave: PropTypes.func,

    modalActions: PropTypes.object.isRequired,
    modalContext: PropTypes.object.isRequired,
  };

  static defaultProps = {
    onEdit: () => true,
    onSave: () => true,
  };

  handleEditToggle = () => {
    const isEditable = !this.props.modalContext.isEditable;
    if (!isEditable) {
      if (this.props.onSave()) {
        this.updateContext(false);
      }
    } else {
      if (this.props.onEdit()) {
        this.updateContext(true);
      }
    }
  };

  updateContext = (isEditable) => {
    this.props.modalActions.mergeInContext({
      isEditable,
    });
  };

  render() {
    const { isEditable } = this.props.modalContext;

    return (
      <div className={cx('title-with-edit-modal-header')}>
        <div className={cx('title-with-edit-modal-header__title')}>
          <h5>{this.props.title}</h5>
        </div>
        <div className={cx('title-with-edit-modal-header__editIcon')}><IconButton>
          <FontIcon
            onClick={this.handleEditToggle}
            className="material-icons"
          >{isEditable ? 'save' : 'edit'}</FontIcon>
        </IconButton></div>
      </div>
    );
  }

}

export default connect((state) => ({
  modalContext: state.modal.context,
}), (dispatch) => ({
  modalActions: bindActionCreators(allModalActions, dispatch),
}))(TitleWithEditModalHeader);
