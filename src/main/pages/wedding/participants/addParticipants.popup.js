import React, { PropTypes, PureComponent } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import includes from 'lodash/includes';
import keys from 'lodash/keys';


const roleNamesMapping = {
  bride: 'Bride',
  groom: 'Groom',
  bridesmaid: 'Bridesmaid',
  bestMan: 'Best man',
  motherOfBride: 'Mother of Bride',
  fatherOfBride: 'Father of Bride',
  motherOfGroom: 'Mother of Groom',
  fatherOfGroom: 'Father of Groom',
};

export default class AddParticipantsPopup extends PureComponent {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    participants: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      participantSelections: mapValues(roleNamesMapping, (name, role) =>
        includes(this.props.participants, { role })),
    };
  }

  setSelection = (participantRole, value) => {
    this.setState({
      participantSelections: {
        [participantRole]: value,
      },
    });
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleSubmit = () => {
    this.props.onClose(this.state.participantSelections); // list of participant roles to add
  };

  render() {
    const renderParticipantCheckbox = (participantRole) => {
      const { participantSelections } = this.state;
      return (<Checkbox
        key={participantRole}
        disabled={includes(this.props.participants, { role: participantRole })}
        label={roleNamesMapping[participantRole]}
        checked={participantSelections[participantRole]}
        onCheck={(evt, checked) => this.setSelection(participantRole, checked)} // eslint-disable-line
      />);
    };

    return (
      <Dialog
        title="Add participants"
        actions={<div>
          <FlatButton
            label="Cancel"
            keyboardFocused
            onTouchTap={this.handleClose}
          />
          <FlatButton
            label="Save"
            primary
            keyboardFocused
            onTouchTap={this.handleSubmit}
          />
        </div>}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.handleClose}
      >

        {
          map(keys(roleNamesMapping), renderParticipantCheckbox)
        }

      </Dialog>
    );
  }

}
