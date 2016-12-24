import React, {PropTypes} from "react";
import Layout from "../../layout/Layout";
import classnames from "classnames/bind";
import LayoutContainer from "../../layout/LayoutContainer";
import LoginForm from "../../components/LoginForm";
import RegistrationForm from '../../components/RegistrationForm'
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Spacer from '../../components/Spacer'
import ContentSection from '../../components/ContentSection'
import ParallaxContent from '../../components/ParallaxContent'
import Carousel from '../../components/Carousel'
import CarouselItem from '../../components/Carousel/CarouselItem'
import styles from "./home.pcss";
import {html} from "./index.md";

import whyNeedUs from '../../assets/whyneedus.jpg'

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

                    <ParallaxContent img={whyNeedUs}>
                        <h2>Want to do this all by yourself?</h2>
                    </ParallaxContent>

                    <ContentSection alternate header={<h2>Hell no! Let us help you.</h2>}>

                        <Carousel style={{
                            height: '600px'
                        }}>
                            <CarouselItem key={1} img={'https://placeholdit.imgix.net/~text?txtsize=90&txt=960%C3%97500&w=960&h=500'}>
                                abc
                            </CarouselItem>
                            <CarouselItem key={2} img={'https://placeholdit.imgix.net/~text?txtsize=90&txt=960%C3%97500&w=960&h=500'}>
def
                            </CarouselItem>
                        </Carousel>

                    </ContentSection>

                    <ParallaxContent img={whyNeedUs}>

                        <RegistrationForm style={{
                            width: '100%',
                            maxWidth: '986px'
                        }} />

                    </ParallaxContent>

                </LayoutContainer>


            </Layout>
        );
    }

}
