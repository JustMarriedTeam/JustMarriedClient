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
import GuestDetails, { GUEST_DISPLAY_TYPE } from './guests.details';
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
import * as allGuestsActions from '../../../core/actions/guests.actions';
import { connect } from 'react-redux';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import LayoutContainer from '../../../layout/LayoutContainer';
import ConditionalRenderer from '../../../utils/ConditionalRenderer';
import { selectGuests } from '../../../core/selectors/guests.selector';

const cx = classNames.bind(styles);


class GuestsView extends Component {

  static propTypes = {
    actionBarActions: PropTypes.object.isRequired,
    guestsActions: PropTypes.object.isRequired,
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
        displayType: GUEST_DISPLAY_TYPE.NEW_GUEST,
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
    this.props.guestsActions.removeGuests(
      filter(this.props.guests, (item, index) => includes(this.state.selectedGuests, index))
    );
    this.setState({
      isSelectable: false,
    });
  };

  handleRemovingItem = (guest) => {
    this.props.guestsActions.removeGuests([guest]);
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

  handleScrollTop = () => {
    animateScroll.scrollToTop();
  };

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        open: false,
        message: '',
      },
    });
  };

  handleAddingGuest = () => this.openGuestDetails({
    displayType: GUEST_DISPLAY_TYPE.NEW_GUEST,
  });

  handleOpeningDetails = (guest) => this.openGuestDetails({
    displayType: GUEST_DISPLAY_TYPE.EXISTING_GUEST,
    guestId: guest.id,
  });

  openGuestDetails({ displayType, guestId }) {
    this.setState({
      details: {
        isOpen: true,
        displayType,
        guestId,
      },
    });
  }

  handleClosingDetails = () => this.closeGuestDetails();

  closeGuestDetails() {
    this.setState({
      details: {
        isOpen: false,
        guestId: null,
      },
    });
  }

  handleUndoingOperation = () => {
    this.closeSnackbar();
  };

  handleComitingOperation = () => {
    this.closeSnackbar();
  };

  render() {
    const { isEditing } = this.props;

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
                      primaryText={ isEditing ? 'Edit' : 'Details' }
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

        <Spacer name="endOfList" weight="hg" />

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

        <ConditionalRenderer show={this.state.details.isOpen}>
          <GuestDetails
            displayType={this.state.details.displayType}
            onClose={this.handleClosingDetails}
            isOpen={this.state.details.isOpen}
            guestId={this.state.details.guestId}
          />
        </ConditionalRenderer>

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
  guestsActions: bindActionCreators(allGuestsActions, dispatch),
}))(GuestsView);

