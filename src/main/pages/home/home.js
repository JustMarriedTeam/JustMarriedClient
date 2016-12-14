import React, {PropTypes} from "react";
import Layout from "../../layout/Layout";
import {title, html} from "./index.md";
import { Grid, Row, Col } from 'react-flexbox-grid'
import LoginForm from "../../components/LoginForm/LoginForm"
import Spacer from '../../components/Spacer/Spacer'

export default class HomePage extends React.Component {

    render() {
        return (
            <Layout>
                <Grid>
                    <Spacer weight="lg" />
                    <Row>
                        <Col xs={0} sm={6} md={6} lg={8} />
                        <Col xs={12} sm={6} md={6} lg={4} >
                            <LoginForm />
                        </Col>
                    </Row>
                </Grid>
            </Layout>
        );
    }

}
