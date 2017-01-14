import React, { PropTypes, PureComponent } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';
import { Menu, MainButton, ChildButton } from 'react-mfb';
import Spacer from '../../../components/Spacer';
import classNames from 'classnames/bind';
import styles from './guests.view.pcss';
import reduce from 'lodash/reduce';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import * as actionBarActions from '../../../core/actions/actionbar.actions';
import { connect } from 'react-redux';

const cx = classNames.bind(styles);

class GuestsView extends PureComponent {

  static propTypes = {
    displayContextMenu: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isSelectable: false,
      activeFilters: [],
      guestRegistry: {
        guests: [
          { id: 'a', firstName: 'Grzegorz', lastName: 'Gurgul' },
          { id: 'b', firstName: 'Agata', lastName: 'Nowakiewicz' },
          { id: 'c', firstName: 'Django', lastName: 'Szynszyl' },
          { id: 'd', firstName: 'Java', lastName: 'Szynszyl' },
          { id: 'e', firstName: 'Java', lastName: 'Szynszyl' },
          { id: 'f', firstName: 'Java', lastName: 'Szynszyl' },
          { id: 'g', firstName: 'Java', lastName: 'Szynszyl' },
          { id: 'h', firstName: 'Java', lastName: 'Szynszyl' },
          { id: 'i', firstName: 'Java', lastName: 'Szynszyl' },
          { id: 'j', firstName: 'Java', lastName: 'Szynszyl' },
          { id: 'k', firstName: 'Java', lastName: 'Szynszyl' },
          { id: 'l', firstName: 'Java', lastName: 'Szynszyl' },
          { id: 'm', firstName: 'Java', lastName: 'Szynszyl' },
          { id: 'n', firstName: 'Java', lastName: 'Szynszyl' },
          { id: 'o', firstName: 'Java', lastName: 'Szynszyl' },
          { id: 'p', firstName: 'Java', lastName: 'Szynszyl' },
        ],
      },
    };

    this.state.guestCursor = reduce(this.state.guestRegistry.guests, (result, guest) => {
      result[guest.id] = {
        isSelected: false,
      };
      return result;
    }, {});
  }

  handleSelect = () => {
    this.setState({
      isSelectable: true,
    });
  };

  handleRemove = () => {
    this.setState({
      isSelectable: false,
    });
  };

  handleFilter = (filters) => {
    this.setState({
      activeFilters: filters,
    });
  };

  componentDidMount() {
    this.props.displayContextMenu(
      <div>
        <IconMenu
          iconButtonElement={<IconButton><ContentFilter /></IconButton>}
          onChange={this.handleFilter}
          value={this.state.activeFilters}
          multiple
        >
          <MenuItem value="1" primaryText="Already invited" />
          <MenuItem value="2" primaryText="Invitation pending" />
          <MenuItem value="3" primaryText="Rejected invitation" />
        </IconMenu>

        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Select" onTouchTap={this.handleSelect} />
          <MenuItem
            disabled={!this.state.isSelectable}
            primaryText="Remove selected"
            onTouchTap={this.handleRemove}
          />
        </IconMenu>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Table
          selectable={this.state.isSelectable}
          multiSelectable={this.state.isSelectable}
        >

          <TableHeader
            displaySelectAll={this.state.isSelectable}
            adjustForCheckbox={this.state.isSelectable}
            enableSelectAll={this.state.isSelectable}
          >

            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Surname</TableHeaderColumn>
            </TableRow>

          </TableHeader>

          <TableBody
            displayRowCheckbox={this.state.isSelectable}
            showRowHover={this.state.isSelectable}
          >

            {this.state.guestRegistry.guests.map((guest) => (
              <TableRow key={guest.id} selected={this.state.guestCursor[guest.id].isSelected}>
                <TableRowColumn>{guest.firstName}</TableRowColumn>
                <TableRowColumn>{guest.lastName}</TableRowColumn>
              </TableRow>
            ))}

          </TableBody>

          <TableFooter
            adjustForCheckbox={this.state.isSelectable}
          >
            <TableRow>
              <TableRowColumn colSpan="2" style={{ textAlign: 'center' }}>

              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>


        <Menu effect="zoomin" method="click" position="br">
          <MainButton iconResting="ion-plus-round" iconActive="ion-close-round" />
          <ChildButton
            icon="ion-social-github"
            label="View on Github"
            href="https://github.com/nobitagit/react-material-floating-button/"
          />
          <ChildButton
            icon="ion-social-octocat"
            label="Follow me on Github"
            href="https://github.com/nobitagit"
          />
          <ChildButton
            icon="ion-social-twitter"
            label="Share on Twitter"
            href="http://twitter.com/share?text=Amazing Google Inbox style material floating menu as a React component!&url=http://nobitagit.github.io/react-material-floating-button/&hashtags=material,menu,reactjs,react,component"
          />
        </Menu>


        <Spacer weight="hg" />

      </div>
    );
  }

}

export default connect(() => ({
}), actionBarActions)(GuestsView);

