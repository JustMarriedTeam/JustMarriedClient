import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import LayoutBar from './LayoutBar/LayoutBar';
import LayoutDrawer from './LayoutDrawer/LayoutDrawer';
import LayoutFooter from './LayoutFooter/LayoutFooter';
import Alert from './Alert';
import Popup from './Popup';
import Modal from './Modal';
import styles from './Layout.pcss';
import ConditionalRenderer from '../utils/ConditionalRenderer';
import Account from '../core/models/account.model';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';

const cx = classNames.bind(styles);

class Layout extends Component {

  static propTypes = {
    account: PropTypes.instanceOf(Account).isRequired,
    children: PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  };

  constructor() {
    super();
    this.state = {
      drawer: {
        open: false,
      },
    };
  }

  toggleDrawer = () => {
    this.setState((prevState) => ({
      drawer: {
        open: !prevState.drawer.open,
      },
    }));
  };

  render() {
    return (
      <StickyContainer className={cx('layout__root')}>

        <Sticky style={{ zIndex: 100 }}>
          <LayoutBar onMenuAction={() => this.toggleDrawer()} />
        </Sticky>

        <ConditionalRenderer show={this.props.account.isSignedIn()}>
          <LayoutDrawer open={this.state.drawer.open} onToggle={this.toggleDrawer} />
        </ConditionalRenderer>

        <main className={cx('layout__content')}>
          <StickyContainer>
            {this.props.children}
          </StickyContainer>
        </main>

        <LayoutFooter />
        <Alert />
        <Popup />
        <Modal />

      </StickyContainer>
    );
  }

}


export default connect((state) => ({
  account: state.account,
}))(Layout);

