import React, { PropTypes } from 'react';
import Layout from '../../layout/Layout';
import classnames from 'classnames/bind';
import LayoutContainer from '../../layout/LayoutContainer';
import LoginForm from '../../components/LoginForm';
import RegistrationForm from '../../components/RegistrationForm';
import RaisedButton from 'material-ui/RaisedButton';
import Spacer from '../../components/Spacer';
import ResponsiveBox from '../../components/ResponsiveBox';
import Carousel from '../../components/Carousel';
import CarouselItem from '../../components/Carousel/CarouselItem';
import Scroll from 'react-scroll';
import styles from './home.page.pcss';
import registrationBg from '../../assets/slide3.jpg';
import { connect } from 'react-redux';
import * as allAccountActions from '../../core/actions/account.actions';
import Account from '../../core/models/account.model';
import ConditionalRenderer from '../../utils/ConditionalRenderer';
import { Background, Parallax } from 'react-parallax';
import ContentSection from '../../components/ContentSection';
import HorizontalButtonPanel from '../../components/HorizontalButtonPanel';
import FeatureBoxContainer from '../../components/FeatureBoxContainer';
import FeatureBox from '../../components/FeatureBox';

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

        <div className={'top-slider'}>

          <Carousel
            className={cx('home__banner')}
            {...{
              autoplay: true,
              autoplaySpeed: 5000,
              dots: true,
              fade: true,
              pauseOnHover: true,
              cssEase: 'linear',
              speed: 1000,
            }}
          >
            <CarouselItem key={1} img={'http://martaw.esy.es/images/slide1.jpg'}>
             <h1>Let's plan your wedding</h1>
            </CarouselItem>
            <CarouselItem key={2} img={'http://martaw.esy.es/images/slide2.jpg'}>
              <h1>Let's plan your wedding 2</h1>
            </CarouselItem>
            <CarouselItem key={3} img={'http://martaw.esy.es/images/slide3.jpg'}>
              <h1>Let's plan your wedding 3</h1>
            </CarouselItem>
          </Carousel>

        </div>

        <LayoutContainer>


          <ScrollToElement name="start">

            <ContentSection centered>

              <h1>Pomożemy Ci zaplanować wymarzone wesele!</h1>
              <p>Doskonale wiemy, jak wielkim wysiłkiem dla młodej pary jest organizacja wesela. <br />
                Dlatego przedstawiamy Wam <b>bezpłatne</b> narzędzie, które poprowadzi Was przez wszystkie etapy tego
                procesu. <br /> Odpręż się bo, od teraz "Kreator weselny" ma wszystko pod kontrolą!</p>

              <ConditionalRenderer show={!this.props.account.isSignedIn()}>

                <HorizontalButtonPanel
                  buttons={[
                    <RaisedButton
                      label="Rejestracja"
                      onClick={this.handleStart}
                      primary
                    />,
                    <RaisedButton
                      onClick={this.toggleLoginForm}
                      disabled={this.state.loginForm.shown}
                      label="Logowanie"
                      href={'#continue'}
                      secondary
                    />,
                  ]}
                />

              </ConditionalRenderer>

              <Spacer />

              <LoginPane isVisible={this.state.loginForm.shown} />

            </ContentSection>

          </ScrollToElement>


          <Parallax strength={300}>
            <Background>
              <img src="http://martaw.esy.es/images/work.jpg" />
            </Background>
            <h2 style={{ textAlign: 'center', padding: '130px 0' }}>Na prawdę chcesz robic to sam?</h2>
          </Parallax>


          <ScrollToElement name="more">

            <ContentSection centered>

              <h1>Nie musisz! Za darmo otrzymujesz:</h1>

              <FeatureBoxContainer
                features={[
                  <FeatureBox
                    title="Wedding todos"
                    icon="https://image.freepik.com/free-icon/calendar-page-of-day-25_318-58109.jpg"
                  />,

                  <FeatureBox
                    title="Timeline"
                    icon="https://image.freepik.com/free-icon/calendar-page-of-day-25_318-58109.jpg"
                  />,

                  <FeatureBox
                    title="Manage guests"
                    icon="https://image.freepik.com/free-icon/calendar-page-of-day-25_318-58109.jpg"
                  />,

                  <FeatureBox
                    title="Manage guests"
                    icon="https://image.freepik.com/free-icon/calendar-page-of-day-25_318-58109.jpg"
                  />,

                  <FeatureBox
                    title="Manage guests"
                    icon="https://image.freepik.com/free-icon/calendar-page-of-day-25_318-58109.jpg"
                  />,

                  <FeatureBox
                    title="Manage guests"
                    icon="https://image.freepik.com/free-icon/calendar-page-of-day-25_318-58109.jpg"
                  />,
                ]}
              />

            </ContentSection>

            <ConditionalRenderer show={!this.props.account.isSignedIn()}>
              <Parallax>
                <Background>
                  <img role="presentation" src={registrationBg} />
                </Background>
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
              </Parallax>
            </ConditionalRenderer>
          </ScrollToElement>
        </LayoutContainer>


      </Layout>
    );
  }

}


export default connect((state) => ({
  account: state.account,
}), allAccountActions)(HomePage);

