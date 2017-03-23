import React, { PropTypes } from 'react';
import Layout from '../../layout/Layout';
import classnames from 'classnames/bind';
import LayoutContainer from '../../layout/LayoutContainer';
import LoginForm from '../../components/LoginForm';
import RegistrationForm from '../../components/RegistrationForm';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Spacer from '../../components/Spacer';
import ContentSection from '../../components/ContentSection';
import ResponsiveBox from '../../components/ResponsiveBox';
import ParallaxContent from '../../components/ParallaxContent';
import Carousel from '../../components/Carousel';
import CarouselItem from '../../components/Carousel/CarouselItem';
import Scroll from 'react-scroll';
import styles from './home.page.pcss';
import whyNeedUs from '../../assets/whyneedus.jpg';
import registrationBg from '../../assets/registrationbg.jpg';
import { connect } from 'react-redux';
import * as allAccountActions from '../../core/actions/account.actions';
import Account from '../../core/models/account.model';
import ConditionalRenderer from '../../utils/ConditionalRenderer';

const cx = classnames.bind(styles);
const ScrollToElement = Scroll.Element;
const scroller = Scroll.scroller;

class HomePage extends React.Component {

  static propTypes = {
    account: PropTypes.instanceOf(Account).isRequired,
  };

  constructor() {
    super();
    this.state = {
      loginForm: {
        shown: false,
      },
    };
  }

  toggleLoginForm = () => {
    this.setState((prevState) => ({
      loginForm: {
        shown: !prevState.loginForm.shown,
      },
    }));
  };

  handleStart = () => {
    scroller.scrollTo('registration', {
      duration: 1000,
      delay: 100,
      smooth: true,
    });
  };


  render() {
    function LoginPane(props) {
      if (props.isVisible) {
        return <LoginForm />;
      }
      return null;
    }


    return (
      <Layout>
        <div className={cx('home__banner')}>
          <div className={cx('home__banner-content')}>
            <div className={cx('home__logo')} />
            <div className={cx('home__slogan')}>

              <h1>Just Married</h1>
              <h4>Let's plan your wedding!</h4>

              <ConditionalRenderer show={!this.props.account.isSignedIn()}>
                <div>
                  <RaisedButton
                    label="Start here"
                    secondary
                    onClick={this.handleStart}
                  />

                  <FlatButton
                    onClick={this.toggleLoginForm}
                    disabled={this.state.loginForm.shown}
                    label="or sign in"
                    href={'#continue'}
                  />
                </div>
              </ConditionalRenderer>

            </div>

            <Spacer />

            <LoginPane isVisible={this.state.loginForm.shown} />

          </div>
        </div>

        <LayoutContainer>

          <ParallaxContent img={whyNeedUs}>
            <h2
              style={{
                padding: '120px 0',
                textAlign: 'center',
              }}
            >Want to do this all by yourself?</h2>
          </ParallaxContent>

          <ContentSection alternate header={<h2>Hell no! Let us help you.</h2>}>

            <Carousel
              style={{
                height: '600px',
              }}
            >
              <CarouselItem key={1} img={'https://placeholdit.imgix.net/~text?txtsize=90&txt=960%C3%97500&w=960&h=500'}>
                abc
              </CarouselItem>
              <CarouselItem key={2} img={'https://placeholdit.imgix.net/~text?txtsize=90&txt=960%C3%97500&w=960&h=500'}>
                def
              </CarouselItem>
            </Carousel>

          </ContentSection>

          <ConditionalRenderer show={!this.props.account.isSignedIn()}>
            <ParallaxContent img={registrationBg}>

              <ScrollToElement name="registration">
                <ResponsiveBox>
                  <div
                    style={{
                      padding: '120px 30px',
                    }}
                  >
                    <RegistrationForm />
                  </div>
                </ResponsiveBox>
              </ScrollToElement>

            </ParallaxContent>
          </ConditionalRenderer>

        </LayoutContainer>


      </Layout>
    );
  }

}


export default connect((state) => ({
  account: state.account,
}), allAccountActions)(HomePage);
