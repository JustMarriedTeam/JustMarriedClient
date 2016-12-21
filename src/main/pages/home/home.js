import React, {PropTypes} from "react";
import Layout from "../../layout/Layout";
import Banner from "../../components/Banner";
import LayoutContainer from '../../layout/LayoutContainer'
import {html} from "./index.md";

export default class HomePage extends React.Component {

    render() {
        return (
            <Layout>
                <Banner />
                <LayoutContainer>
                    <div dangerouslySetInnerHTML={{__html: html}}/>
                </LayoutContainer>
            </Layout>
        );
    }

}
