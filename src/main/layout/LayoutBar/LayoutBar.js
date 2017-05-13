import React, { PureComponent, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import * as actionBarActions from '../../core/actions/actionbar.actions';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Scroll from 'react-scroll';
import styles from './LayoutBar.pcss';
import Account from '../../core/models/account.model';
import $ from 'jquery'; 

const cx = classNames.bind(styles);
const ScrollToElement = Scroll.Element;
const scroller = Scroll.scroller;

let myStyle = {
    background: 'rgba(229,120,120,0.7)',
    position: 'fixed',
    height: '60px',
     
};
$(window).scroll(function() {
  if($(window).scrollTop() > 0 ) {
            
    $(".scrolling").css('height', '45px');
    $(".scrolling-menu span").css('font-size', '16px');

    }else {
     
   $(".scrolling").css('height', '60px');
   $(".scrolling-menu span").css('font-size', '20px');
        
  }  
});

class LayoutBar extends PureComponent {

  static propTypes = {
    actionBarMenu: PropTypes.node.isRequired,
    onMenuAction: PropTypes.func.isRequired,
    account: PropTypes.instanceOf(Account).isRequired,
  };
  handleStart = () => {
    scroller.scrollTo('start', {
      duration: 1000,
      delay: 100,
      smooth: true,
    });
  };
   handleMore = () => {
    scroller.scrollTo('more', {
      duration: 1000,
      delay: 100,
      smooth: true,
    });
  };

  render() {
    const { actionBarMenu, onMenuAction, account } = this.props;
    return (
      <AppBar
       style={myStyle}
        className={[cx('layout-bar') , 'scrolling'].join(' ')} 
        onLeftIconButtonTouchTap={onMenuAction}
        iconElementRight={actionBarMenu}
        showMenuIconButton={account.isSignedIn()}
        title=""
        zDepth={0}
        
      >
      <div className={[cx('layout-bar-menu') , 'scrolling-menu'].join(' ')} >
          <span onClick={this.handleStart}>start</span>
          <span onClick={this.handleMore}>dowiedz się więcej</span>
          <span>działaj</span>

      </div>

      </AppBar>
    );
  }

}

export default connect((state) => ({
  actionBarMenu: state.actionBar.toJS().menu,
  account: state.account,
}), actionBarActions)(LayoutBar);

