import React, {Component, PropTypes} from "react";
import { Grid, Row, Col } from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField'
import Spacer from '../Spacer/Spacer'

export default class LoginForm extends Component {


    render() {
        return (
            <div>
                <Grid>
                    <Row>

                        <Col xs={12} md={6}>
                            <RaisedButton
                                href="http://localhost:2701/api/auth/facebook"
                                target="_blank"
                                label="Login with facebook"
                                icon={<FontIcon className="fa fa-facebook-square" />}
                            />
                            <RaisedButton
                                href="http://localhost:2701/api/auth/google"
                                target="_blank"
                                label="Login with google"
                                icon={<FontIcon className="fa fa-facebook-square" />}
                            />
                        </Col>

                        <Col xs={12} md={6}>
                            <Grid>
                                <Row>
                                    <Col xs={6} md={3}>
                                        <TextField
                                            hintText="Login"/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} md={3}>
                                        <TextField
                                            hintText="Password"/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} md={3}>
                                        <RaisedButton label="Login"/>
                                    </Col>
                                </Row>
                            </Grid>
                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }

}
