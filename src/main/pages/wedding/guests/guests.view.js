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
import GuestDetails from './guests.details';
import { Menu, MainButton, ChildButton } from 'react-mfb';
import { animateScroll } from 'react-scroll';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Spacer from '../../../components/Spacer';
import classNames from 'classnames/bind';
import styles from './guests.view.pcss';
import { bindActionCreators } from 'redux';
import * as actionBarActions from '../../../core/actions/actionbar.actions';
import * as weddingActions from '../../../core/actions/wedding.actions';
import { connect } from 'react-redux';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import { createGuest } from '../../../core/factories/guest.factory';
import LayoutContainer from '../../../layout/LayoutContainer';
import ConditionalRenderer from '../../../utils/ConditionalRenderer';
import { selectGuests } from '../../../core/selectors/guests.selector';

const cx = classNames.bind(styles);

class GuestsView extends Component {

  static propTypes = {
    actionBarActions: PropTypes.object.isRequired,
    weddingActions: PropTypes.object.isRequired,
    guests: PropTypes.array.isRequired,
    isEditing: PropTypes.bool.isRequired,
    onMount: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isSelectable: false,
      selectedGuests: [],
      details: {
        isOpen: false,
        guest: null,
      },
      snackbar: {
        open: false,
        message: '',
      },
    };
  }

  componentDidMount() {
    this.props.onMount({
      otherContextItems: <GuestsMenu
        handleSelect={this.handleSelect}
        handleFilter={this.handleFilter}
        handleRemove={this.handleRemove}
      />,
    });
  }

  handleSelect = () => {
    this.setState({
      isSelectable: true,
    });
  };

  handleRemove = () => {
    this.props.weddingActions.removeGuests(
      filter(this.props.guests, (item, index) => includes(this.state.selectedGuests, index))
    );
    this.setState({
      isSelectable: false,
    });
  };

  handleRemovingItem = (guest) => {
    this.props.weddingActions.removeGuests([guest]);
    this.setState({
      snackbar: {
        open: true,
        message: 'Removed guest',
      },
    });
  };

  handleFilter = (filters) => {
    this.setState({
      activeFilters: filters,
    });
  };

  handleRowSelection = (selectedGuests) => {
    if (selectedGuests === 'all') {
      this.setState({
        selectedGuests: Array.from({ length: this.props.guests.length }, (v, k) => k),
      });
    } else {
      this.setState({
        selectedGuests,
      });
    }
  };

  handleAddingGuest = () => {
    const newGuest = createGuest();
    this.props.weddingActions.addGuest(newGuest);
    animateScroll.scrollToBottom();
    this.openGuestDetails(newGuest);
  };

  handleScrollTop = () => {
    animateScroll.scrollToTop();
  };

  handleUndoingOperation = () => {
    this.closeSnackbar();
  };

  handleComitingOperation = () => {
    this.closeSnackbar();
  };

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        open: false,
        message: '',
      },
    });
  };

  handleOpeningDetails = (guest) => this.openGuestDetails(guest);

  openGuestDetails(guest) {
    this.setState({
      details: {
        isOpen: true,
        guest,
      },
    });
  }

  handleClosingDetails = (savedGuest) => {
    if (savedGuest) {
      this.props.weddingActions.updateGuest(savedGuest);
    }
    this.closeGuestDetails();
  };

  closeGuestDetails() {
    this.setState({
      details: {
        isOpen: false,
        guest: null,
      },
    });
  }

  render() {
    return (
      <LayoutContainer>
        <Table
          selectable={this.state.isSelectable}
          multiSelectable={this.state.isSelectable}
          onRowSelection={this.handleRowSelection}
        >

          <TableHeader
            className={cx('guests-view__header')}
            displaySelectAll={this.state.isSelectable}
            adjustForCheckbox={this.state.isSelectable}
            enableSelectAll={this.state.isSelectable}
          >

            <TableRow>
              <TableHeaderColumn
                className={cx('guests-view__position-header')}
              >Pos.</TableHeaderColumn>
              <TableHeaderColumn>Surname</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn
                className={cx('guests-view__email-header')}
              >e-mail</TableHeaderColumn>
              <TableHeaderColumn
                className={cx('guests-view__actions-header')}
              />
            </TableRow>

          </TableHeader>

          <TableBody
            stripedRows
            displayRowCheckbox={this.state.isSelectable}
            showRowHover={this.state.isSelectable}
          >

            {this.props.guests.map((guest, rowNumber) => (
              <TableRow
                key={rowNumber}
                rowNumber={rowNumber}
                selected={includes(this.state.selectedGuests, rowNumber)}
              >
                <TableRowColumn
                  className={cx('guests-view__position-row')}
                >{rowNumber + 1}</TableRowColumn>
                <TableRowColumn>{guest.lastName}</TableRowColumn>
                <TableRowColumn>{guest.firstName}</TableRowColumn>
                <TableRowColumn
                  className={cx('guests-view__email-row')}
                >{guest.email}</TableRowColumn>
                <TableRowColumn
                  className={cx('guests-view__actions-row')}
                >
                  <IconMenu
                    useLayerForClickAway
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                  >
                    <MenuItem
                      primaryText="Details"
                      onTouchTap={() => this.handleOpeningDetails(guest)}
                    />
                    <MenuItem
                      primaryText="Remove"
                      onTouchTap={() => this.handleRemovingItem(guest)}
                    />
                  </IconMenu>
                </TableRowColumn>
              </TableRow>
            ))}

          </TableBody>

          <TableFooter
            adjustForCheckbox={this.state.isSelectable}
          >
            <TableRow>
              <TableRowColumn colSpan="5" style={{ textAlign: 'center' }}>
                <FlatButton onClick={this.handleScrollTop} label="Scroll to top" />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>

        <ConditionalRenderer show={this.props.isEditing}>
          <Menu effect="zoomin" method="click" position="br">
            <MainButton
              iconResting="ion-plus-round"
              iconActive="ion-close-round"
            />
            <ChildButton
              icon="ion-person-add"
              label="Add new guest"
              onClick={this.handleAddingGuest}
            />
          </Menu>
        </ConditionalRenderer>


        <Spacer name="endOfList" weight="hg" />

        <GuestDetails
          onClose={this.handleClosingDetails}
          isOpen={this.state.details.isOpen}
          guest={this.state.details.guest}
        />

        <Snackbar
          open={this.state.snackbar.open}
          message={this.state.snackbar.message}
          action="undo"
          autoHideDuration={5000}
          onActionTouchTap={this.handleUndoingOperation}
          onRequestClose={this.handleComitingOperation}
        />

      </LayoutContainer>
    );
  }

}

// https://github.com/reactjs/react-redux/blob/master/docs/api.md
export default connect((state) => ({
  guests: selectGuests(state),
  isEditing: state.action.editing,
}), (dispatch) => ({
  actionBarActions: bindActionCreators(actionBarActions, dispatch),
  weddingActions: bindActionCreators(weddingActions, dispatch),
}))(GuestsView);

