import React, {PropTypes} from "react";
import Layout from "../../layout/Layout";
import classnames from "classnames/bind";
import LayoutContainer from "../../layout/LayoutContainer";
import styles from "./home.pcss";
import {html} from "./index.md";

const cx = classnames.bind(styles);

export default class HomePage extends React.Component {

    render() {
        return (
            <Layout>
                <div className={cx('home__banner')}>
                    <div className={cx('home__slogan')}>

                        <h2>Let us plan</h2>
                        <h1>A great wedding</h1>
                        <h2>for you</h2>

                    </div>
                </div>


                <LayoutContainer>
                    <div dangerouslySetInnerHTML={{__html: html}}/>
                </LayoutContainer>
            </Layout>
        );
    }

}
