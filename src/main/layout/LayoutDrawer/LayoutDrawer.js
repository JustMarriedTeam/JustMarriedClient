import React, { PureComponent, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import DrawerLinkGroup, { DrawerLinkItem } from './DrawerLinkGroup';
import Divider from 'material-ui/Divider';
import Home from 'material-ui/svg-icons/action/home';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Cake from 'material-ui/svg-icons/social/cake';
import Assignment from 'material-ui/svg-icons/action/assessment';
import Timeline from 'material-ui/svg-icons/action/timeline';
import Payment from 'material-ui/svg-icons/action/payment';
import AccountPanel from './AccountPanel';

export default class LayoutDrawer extends PureComponent {

  static propTypes = {
    onToggle: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <Drawer
        docked={false}
        width={300}
        zDepth={4}
        open={this.props.open}
        onRequestChange={this.props.onToggle}
      >

        <AccountPanel />

        <DrawerLinkGroup>

          <Divider />

          <DrawerLinkItem
            to={'/home'}
            primaryText="Home"
            leftIcon={<Home />}
          />

          <DrawerLinkItem
            to={'/dashboard'}
            primaryText="Dashboard"
            leftIcon={<Dashboard />}
          />

          <DrawerLinkItem
            to={'/wedding'}
            primaryText="My wedding"
            leftIcon={<Cake />}
          />

          <DrawerLinkItem
            to={'/tasks'}
            primaryText="Tasks"
            leftIcon={<Assignment />}
          />

          <DrawerLinkItem
            to={'/timeline'}
            primaryText="Timeline"
            leftIcon={<Timeline />}
          />

          <DrawerLinkItem
            to={'/expenses'}
            primaryText="Expenses"
            leftIcon={<Payment />}
          />

          <Divider />

        </DrawerLinkGroup>
      </Drawer>
    );
  }
}
