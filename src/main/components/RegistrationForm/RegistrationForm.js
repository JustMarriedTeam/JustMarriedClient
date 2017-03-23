import React, { PureComponent, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Flex, Box } from 'reflexbox';
import FontIcon from 'material-ui/FontIcon';
import LocalRegistrationForm from '../LocalRegistrationForm';
import Spacer from '../Spacer/Spacer';
import SeparatingLine from '../SeparatingLine/SeparatingLine';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import * as allAccountActions from '../../core/actions/account.actions';

class RegistrationForm extends PureComponent {

  static propTypes = {
    signInViaGoogle: PropTypes.func.isRequired,
    signInViaFacebook: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Flex wrap align="stretch" justify="space-around">

        <Box col={12} md={5} p={1}>
          <LocalRegistrationForm />
        </Box>

        <MediaQuery maxWidth="767px">
          <Box col={12} p={1}>
            <SeparatingLine type="horizontal" text="or" />
          </Box>
        </MediaQuery>

        <MediaQuery minWidth="768px">
          <Box col={2} p={1}>
            <SeparatingLine type="vertical" text="or" />
          </Box>
        </MediaQuery>

        <Box sm={12} md={5} p={1}>

          <RaisedButton
            onClick={this.props.signInViaFacebook}
            target="_blank"
            backgroundColor="#27cbe0"
            fullWidth
            label="Register with facebook"
            icon={<FontIcon className="fa fa-facebook-square" />}
          />

          <Spacer weight="sm" />

          <RaisedButton
            onClick={this.props.signInViaGoogle}
            target="_blank"
            backgroundColor="#27cbe0"
            fullWidth
            label="Register with google"
            icon={<FontIcon className="fa fa-google-plus-square" />}
          />

        </Box>


      </Flex>
    );
  }

}

export default connect(() => ({
}), allAccountActions)(RegistrationForm);
