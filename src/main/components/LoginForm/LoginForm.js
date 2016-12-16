import React, {Component, PropTypes} from "react";
import RaisedButton from "material-ui/RaisedButton";
import {Grid, Row, Col} from 'react-flexbox-grid';
import FontIcon from "material-ui/FontIcon";
import TextField from "material-ui/TextField";
import Spacer from "../Spacer/Spacer";
import Paper from "material-ui/Paper";
import SeparatingLine from "../SeparatingLine/SeparatingLine";
import classNames from "classnames/bind";
import styles from "./LoginForm.css";

let cx = classNames.bind(styles);


export default class LoginForm extends Component {


    render() {
        return (
            <Grid className={cx('login-form')}>

                <Row>

                    <Col xs={12}>
                        <h2>Login into JustMarried</h2>
                        <div>Enter login details or <a href="/href">create an account</a></div>
                        <SeparatingLine marginBottom="40px" />
                    </Col>

                </Row>

                <Row>

                    <Col xs={12}>
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
                    </Col>

                    <Col xs={12}>

                    </Col>

                    <Col xs={12}>

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

                    </Col>

                </Row>

            </Grid>
        );
    }

}
