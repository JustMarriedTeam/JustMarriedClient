import React, {Component, PropTypes} from "react";
import RaisedButton from "material-ui/RaisedButton";
import {Flex, Box} from 'reflexbox'
import FontIcon from "material-ui/FontIcon";
import TextField from "material-ui/TextField";
import Spacer from "../Spacer/Spacer";
import SeparatingLine from "../SeparatingLine/SeparatingLine";
import MediaQuery from 'react-responsive';
import classNames from "classnames/bind";
import styles from "./LoginForm.pcss";

let cx = classNames.bind(styles);


export default class LoginForm extends Component {


    render() {
        return (
            <Flex wrap className={cx('login-form')} align="stretch" justify="space-around">


                <Box sm={12}>
                    <h2>Login into JustMarried</h2>
                    <div className={cx('login-form__description')}>Enter login details or <a href="/href">create an account</a></div>
                    <SeparatingLine marginBottom="40px"/>
                </Box>


                <Box sm={12} md={6} p={2}>
                    <TextField
                        fullWidth={true}
                        hintText="Login"/>

                    <Spacer weight="xs"/>

                    <TextField
                        fullWidth={true}
                        hintText="Password"/>

                    <Spacer weight="md"/>

                    <div className={cx('local-login-btn-section')}>
                        <RaisedButton primary={true} label="Login"/>
                    </div>
                </Box>


                <MediaQuery maxWidth="767px">
                    <SeparatingLine flex col={12} type="horizontal" text="or"/>
                </MediaQuery>

                <MediaQuery minWidth="768px">
                    <SeparatingLine flex col={1} type="vertical" text="or"/>
                </MediaQuery>

                <Box sm={12} md={5} p={2}>

                    <RaisedButton
                        href="http://localhost:2701/api/auth/facebook"
                        target="_blank"
                        backgroundColor="#3B5998"
                        fullWidth={true}
                        label="Login with facebook"
                        icon={<FontIcon className="fa fa-facebook-square"/>}
                    />

                    <Spacer weight="xs"/>

                    <RaisedButton
                        href="http://localhost:2701/api/auth/google"
                        target="_blank"
                        backgroundColor="#a4c639"
                        fullWidth={true}
                        label="Login with google"
                        icon={<FontIcon className="fa fa-google-plus-square"/>}
                    />

                </Box>


            </Flex>
        );
    }

}