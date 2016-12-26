import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Flex, Box } from 'reflexbox';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import Spacer from '../Spacer/Spacer';
import SeparatingLine from '../SeparatingLine/SeparatingLine';
import MediaQuery from 'react-responsive';
import classNames from 'classnames/bind';
import styles from './RegistrationForm.pcss';

const cx = classNames.bind(styles);


export default class RegistrationForm extends Component {


  render() {
    return (
            <Flex wrap className={cx('registration-form')} align="stretch" justify="space-around" {...this.props}>

                <Box sm={12} md={5} p={1}>
                    <TextField
                      fullWidth
                      hintText="Login"
                    />

                    <Spacer weight="xs" />

                    <TextField
                      fullWidth
                      hintText="E-mail address"
                    />

                    <Spacer weight="xs" />

                    <TextField
                      fullWidth
                      hintText="Password"
                    />

                    <Spacer weight="md" />

                    <TextField
                      fullWidth
                      hintText="Repeat password"
                    />

                    <Spacer weight="md" />

                    <div className={cx('local-login-btn-section')}>
                        <RaisedButton primary label="Login" />
                    </div>
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
                      href="http://localhost:2701/api/auth/facebook"
                      target="_blank"
                      backgroundColor="#27cbe0"
                      fullWidth
                      label="Register with facebook"
                      icon={<FontIcon className="fa fa-facebook-square" />}
                    />

                    <Spacer weight="xs" />

                    <RaisedButton
                      href="http://localhost:2701/api/auth/google"
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
