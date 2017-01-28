import React, {PropTypes, Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import EditButton from '../../../components/EditButton';

export default class GuestsMenu extends Component {

  static propTypes = {
    handleFilter: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    rightButton: PropTypes.element,
  };

  constructor() {
    super();
    this.state = {
      activeFilters: [],
    };
  }

  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><ContentFilter /></IconButton>}
          onChange={this.props.handleFilter}
          value={this.state.activeFilters}
          multiple
        >
          <MenuItem value="1" primaryText="Already invited"/>
          <MenuItem value="2" primaryText="Invitation pending"/>
          <MenuItem value="3" primaryText="Rejected invitation"/>
        </IconMenu>

        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Select" onTouchTap={this.props.handleSelect}/>
          <MenuItem
            primaryText="Remove selected"
            onTouchTap={this.props.handleRemove}
          />
        </IconMenu>

        <EditButton
          style={{
            display: 'inline-block',
          }}
        />

      </div>
    );
  }

}
