import React, {PropTypes} from "react";
import Layout from "../../layout/Layout";
import classnames from "classnames/bind";
import LayoutContainer from "../../layout/LayoutContainer";
import LoginForm from "../../components/LoginForm";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Spacer from '../../components/Spacer'
import ContentSection from '../../components/ContentSection'
import styles from "./home.pcss";
import {html} from "./index.md";

const cx = classnames.bind(styles);

export default class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {
            loginForm: {
                shown: false
            }
        };
    }

    toggleLoginForm = () => {
        this.setState((prevState) => {
            return {
                loginForm: {
                    shown: !prevState.loginForm.shown
                }
            }
        })
    };


    render() {

        function LoginPane(props) {
            if (props.isVisible) {
                return <LoginForm/>
            } else return null;
        }


        return (
            <Layout>
                <div className={cx('home__banner')}>
                    <div className={cx('home__banner-content')}>
                        <div className={cx('home__logo')}/>
                        <div className={cx('home__slogan')}>

                            <h1>Just Married</h1>
                            <h4>Let's plan your wedding!</h4>

                            <RaisedButton label="Start here" secondary href={'#start'}/>
                            <FlatButton onClick={this.toggleLoginForm} disabled={this.state.loginForm.shown}
                                        label="or sign in" href={'#continue'}/>

                        </div>

                        <Spacer />

                        <LoginPane isVisible={this.state.loginForm.shown}/>

                    </div>
                </div>


                <LayoutContainer>

                    <ContentSection>
                        <h1>Let us do sth</h1>
                        <p>Blablalbalblabl</p>
                    </ContentSection>

                    <ContentSection alternate>
                        <h1>Let us do sth else</h1>
                        <p>Blablalbalblabl</p>
                    </ContentSection>

                    <ContentSection>
                        <h1>Let us do sth else 2</h1>
                        <p>Blablalbalblabl</p>
                    </ContentSection>

                </LayoutContainer>


            </Layout>
        );
    }

}
