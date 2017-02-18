import React, { PropTypes, PureComponent } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as allSelectionActions from '../../../core/actions/selection.actions';

class MultiActions extends PureComponent {

  static propTypes = {
    selectionActions: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onRemove: PropTypes.func,
    isSelecting: PropTypes.bool.isRequired,
  };

  render() {
    const { selectionActions, onSelect, onRemove } = this.props;

    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText="Select"
          disabled={this.props.isSelecting}
          onTouchTap={() => selectionActions.selectMultiple(onSelect)}
        />
        <MenuItem
          primaryText="Remove selected"
          disabled={!this.props.isSelecting}
          onTouchTap={() => selectionActions.removeMultiple(onRemove)}
        />
      </IconMenu>
    );
  }

}

export default connect((state) => ({
  isSelecting: state.action.selecting,
}), (dispatch) => ({
  selectionActions: bindActionCreators(allSelectionActions, dispatch),
}))(MultiActions);
