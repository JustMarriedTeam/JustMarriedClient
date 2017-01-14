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
import classNames from 'classnames/bind';
import styles from './GuestsTable.pcss';

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
        ],
      },
      guestCursor: {
        a: {
          selected: false,
        },
        b: {
          selected: false,
        },
        c: {
          selected: false,
        },
        d: {
          selected: false,
        },
      },
    };
  }

  render() {
    return (
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
            <TableHeaderColumn colSpan="2" tooltip="Super Header" style={{textAlign: 'center'}}>
              Super Header
            </TableHeaderColumn>
          </TableRow>

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
            <TableRow key={guest.id} selected={this.state.guestCursor[guest.id].selected}>
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
              Super Footer
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }

}
