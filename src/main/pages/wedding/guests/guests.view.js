import React, { PropTypes, Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';
import GuestsMenu from './guests.menu';
import { Menu, MainButton, ChildButton } from 'react-mfb';
import Spacer from '../../../components/Spacer';
import classNames from 'classnames/bind';
import styles from './guests.view.pcss';
import { bindActionCreators } from 'redux';
import * as actionBarActions from '../../../core/actions/actionbar.actions';
import * as weddingActions from '../../../core/actions/wedding.actions';
import { connect } from 'react-redux';
import remove from 'lodash/remove';
import find from 'lodash/find';

const cx = classNames.bind(styles);

class GuestsView extends Component {

  static propTypes = {
    actionBarActions: PropTypes.object.isRequired,
    weddingActions: PropTypes.object.isRequired,
    guests: PropTypes.array.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isSelectable: false,
    };
  }

  componentDidMount() {
    this.props.weddingActions.fetchGuests();
    this.props.actionBarActions.displayContextMenu(
      <GuestsMenu
        handleSelect={this.handleSelect}
        handleFilter={this.handleFilter}
        handleRemove={this.handleRemove}
      />
    );
  }

  handleSelect = () => {
    this.setState({
      isSelectable: true,
    });
  };

  handleRemove = () => {
    remove(this.props.guests, (guest) => find(this.props.guests, { id: guest.id }).isSelected);
    this.setState({
      isSelectable: false,
    });
  };

  handleFilter = (filters) => {
    this.setState({
      activeFilters: filters,
    });
  };

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
              <TableHeaderColumn
                className={cx('guests-view__position-header')}
              >Pos.</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Surname</TableHeaderColumn>
            </TableRow>

          </TableHeader>

          <TableBody
            stripedRows
            displayRowCheckbox={this.state.isSelectable}
            showRowHover={this.state.isSelectable}
          >

            {this.props.guests.map((guest, rowNumber) => (
              <TableRow
                key={guest.id}
                selected={find(this.props.guests, { id: guest.id }).isSelected}
              >
                <TableRowColumn
                  className={cx('guests-view__position-row')}
                >{rowNumber}</TableRowColumn>
                <TableRowColumn>{guest.firstName}</TableRowColumn>
                <TableRowColumn>{guest.lastName}</TableRowColumn>
              </TableRow>
            ))}

          </TableBody>

          <TableFooter
            adjustForCheckbox={this.state.isSelectable}
          >
            <TableRow>
              <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>

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

// https://github.com/reactjs/react-redux/blob/master/docs/api.md
export default connect((state) => ({
  guests: state.wedding.guests,
}), (dispatch) => ({
  actionBarActions: bindActionCreators(actionBarActions, dispatch),
  weddingActions: bindActionCreators(weddingActions, dispatch),
}))(GuestsView);

