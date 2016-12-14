import React, {Component, PropTypes} from "react";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import TextField from "material-ui/TextField";
import Spacer from "../Spacer/Spacer";
import Paper from "material-ui/Paper";
import classNames from "classnames/bind";
import styles from "./LoginForm.css";

let cx = classNames.bind(styles);


export default class LoginForm extends Component {


    render() {
        return (
            <Paper zDepth={3} className={cx('login-form')}>

                <h2>Login with</h2>

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

                <Spacer weight="sm"/>
                <h4 className={cx('login-method-or')}>- or -</h4>
                <Spacer weight="sm"/>

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

            </Paper>
        );
    }

}
