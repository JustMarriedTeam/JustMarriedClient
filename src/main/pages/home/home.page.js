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
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Carousel from '../../components/Carousel';
import CarouselItem from '../../components/Carousel/CarouselItem';
import Scroll from 'react-scroll';
import styles from './home.page.pcss';
import whyNeedUs from '../../assets/whyneedus.jpg';
import photorings from '../../assets/photorings.jpg';
import registrationBg from '../../assets/slide3.jpg';
import { connect } from 'react-redux';
import * as allAccountActions from '../../core/actions/account.actions';
import Account from '../../core/models/account.model';
import ConditionalRenderer from '../../utils/ConditionalRenderer';
import { Parallax, Background } from 'react-parallax';
import $ from 'jquery'; 
const cx = classnames.bind(styles);
const ScrollToElement = Scroll.Element;
const scroller = Scroll.scroller;

let h4Style = {
     
    color: '#e57878',
    fontWeight: 300,
    textAlign: 'center',
};
let h5Style = {
     
    color: '#e57878',
    fontSize: '15px',
    fontWeight: 300,
    marginBottom: '20px',
};
let buttonStyle = {
     
    backgroundColor: '#e57878',
    color: 'white',
    padding: '5px',
    height: 'auto',
    margin: '0 10px',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.12)',
     
};
 let buttonStyle2 = {

    backgroundColor: '#6ed1d0',
    color: 'white',
    padding: '5px',
    height: 'auto',
    margin: '0 10px',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.12)',

     
};

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
    var settings = {
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        slidesToShow: 1,
          slidesToScroll: 1,
        // draggable: false,
        fade: true,
        cssEase: 'linear',
        speed: 1000
    };
    
    return (
      <Layout>

      <div className={'top-slider'}>
      
          <Carousel {...settings} style={{
                height: '600px',
              }}>
              <CarouselItem key={1} img={'http://martaw.esy.es/images/slide1.jpg'}>
                 
              </CarouselItem>
              <CarouselItem key={2} img={'http://martaw.esy.es/images/slide2.jpg'}>
                 
              </CarouselItem>
               <CarouselItem key={3} img={'http://martaw.esy.es/images/slide3.jpg'}>
                 
              </CarouselItem>
            </Carousel>
      
       </div>
       <ScrollToElement name="start">
        <div className={cx('home__banner')}>
          <div className={cx('home__banner-content')}>
            
            <div className={cx('home__slogan')}>

              <h1></h1>
              <div className={cx('menu__top')}>
              
              </div>
              <h2 style={h4Style}>Pomożemy Ci zaplanować wymarzone wesele!</h2>
              <h5 style={h5Style}>Doskonale wiemy, jak wielkim wysiłkiem dla młodej pary jest organizacja wesela. Dlatego przedstawiamy Wam **bezpłatne** narzędzie, które poprowadzi Was przez wszystkie etapy tego procesu, czuwając nad tym, aby wszystko przebiegało zgodnie z planem. Od teraz możecie nazywać go Waszym własnym *Kreatorem Weselnym*.</h5>

              <ConditionalRenderer show={!this.props.account.isSignedIn()}>
                <div>
                  <FlatButton
                    label="Rejestracja"
                    
                    style={buttonStyle}
                    onClick={this.handleStart}
                  />

                  <FlatButton
                    onClick={this.toggleLoginForm}
                    disabled={this.state.loginForm.shown}
                     
                    style={buttonStyle2}
                    label="Logowanie"
                    href={'#continue'}
                  />
                </div>
                 
              </ConditionalRenderer>

            </div>

            <Spacer />

            <LoginPane isVisible={this.state.loginForm.shown} />

          </div>
        </div>
        </ScrollToElement>
        <LayoutContainer>
        <Parallax strength={300}>
          <Background>
            <img src="http://martaw.esy.es/images/work.jpg"/>
            <div style={{
               width: 800, 
               height: 300, 
               backgroundColor: '#fff'
              }}></div>
            
          </Background>
          <h1 style={{color : "#6ed1d0", textAlign: 'center', padding: "130px 0",}}>Chesz zrobić wszystko sam? </h1>
        </Parallax>
      <ScrollToElement name="more">
      <div className={cx('home__banner')}>
        <h2 style={h4Style}>Nie musisz, przedstawiamy Ci nasze rozwiązanie!</h2>
      </div>

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
          </ScrollToElement>
        </LayoutContainer>


      </Layout>
    );
  }

}


export default connect((state) => ({
  account: state.account,
}), allAccountActions)(HomePage);


