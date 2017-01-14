import React, { PropTypes, PureComponent } from 'react';
import GuestsTable from '../../../components/GuestsTable';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import * as actionBarActions from '../../../core/actions/actionbar.actions';
import { connect } from 'react-redux';

class GuestsView extends PureComponent {

  static propTypes = {
    displayContextMenu: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.displayContextMenu(
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }

  render() {
    return (
      <div>
        <GuestsTable />
      </div>
    );
  }

}

export default connect(() => ({
}), actionBarActions)(GuestsView);

