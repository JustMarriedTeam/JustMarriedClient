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

    modalActions: PropTypes.object.isRequired,
    modalContext: PropTypes.object.isRequired,
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
            onClick={() => this.props.modalActions.mergeInContext({
              isEditable: !isEditable,
            })}
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
