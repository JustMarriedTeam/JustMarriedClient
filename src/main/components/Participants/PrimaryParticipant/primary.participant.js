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
  };

  render() {
    return (
        <Flex wrap className={cx('primary-participant')} align="center" justify="space-around">

          <Box sm={12}>
            <Avatar
              src="https://placeholdit.imgix.net/~text?txtsize=23&txt=250%C3%97250&w=250&h=250"
              size={250}
            />
          </Box>

          <Box sm={12}>
            <TextField
              hintText="First name"
              floatingLabelText="First name"
              type="text"
            />
          </Box>

          <Box sm={12}>
            <TextField
              hintText="Last name"
              floatingLabelText="Last name"
              type="text"
            />
          </Box>

        </Flex>
    );
  }

}
