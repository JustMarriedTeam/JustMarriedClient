import React, { PureComponent, PropTypes } from 'react';
import { Flex, Box } from 'reflexbox';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import classNames from 'classnames/bind';
import styles from './primary.participant.pcss';

const cx = classNames.bind(styles);

export default class PrimaryParticipant extends PureComponent {

  static propTypes = {
    participantRole: PropTypes.string.isRequired,
    participantRoleName: PropTypes.string.isRequired,
    participantDetails: PropTypes.object,
    isEditable: PropTypes.bool,
  };

  static defaultProps = {
    isEditable: false,
  };

  render() {
    const { participantRoleName, isEditable } = this.props;
    return (
        <Flex wrap className={cx('primary-participant')} align="center" justify="space-around">

          <Box sm={12}>
            <Avatar
              className={cx('primary-participant__avatar')}
              size={250}
            >{participantRoleName}</Avatar>
          </Box>

          <Box sm={12}>
            <TextField
              hintText="First name"
              floatingLabelText="First name"
              disabled={!isEditable}
              type="text"
            />
          </Box>

          <Box sm={12}>
            <TextField
              hintText="Last name"
              floatingLabelText="Last name"
              disabled={!isEditable}
              type="text"
            />
          </Box>

          <Box sm={12}>
            <TextField
              hintText="E-Mail address"
              floatingLabelText="E-Mail address"
              disabled={!isEditable}
              type="text"
            />
          </Box>

        </Flex>
    );
  }

}
