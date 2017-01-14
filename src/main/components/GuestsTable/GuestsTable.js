import React, { PureComponent } from 'react';
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
import Spacer from '../Spacer';
import classNames from 'classnames/bind';
import styles from './GuestsTable.pcss';
import reduce from 'lodash/reduce';

const cx = classNames.bind(styles);

export default class GuestsTable extends PureComponent {

  constructor() {
    super();
    this.state = {
      isSelectable: false,
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
