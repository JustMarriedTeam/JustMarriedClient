import React, {PropTypes} from "react";
import Layout from "../../layout/Layout";
import {title, html} from "./index.md";
import LoginForm from "../../components/LoginForm/LoginForm"

export default class HomePage extends React.Component {

    render() {
        return (
            <Layout>
                <LoginForm />
            </Layout>
        );
    }

}
