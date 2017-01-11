import React, { PureComponent, PropTypes } from 'react';
import ListItemLink from '../../components/ListItemLink/ListItemLink';
import Drawer from 'material-ui/Drawer';
import { List } from 'material-ui/List';
import Home from 'material-ui/svg-icons/action/home';
import Assignment from 'material-ui/svg-icons/action/assessment';
import Timeline from 'material-ui/svg-icons/action/timeline';
import Payment from 'material-ui/svg-icons/action/payment';

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

        <List>

          <ListItemLink
            to={'/home'}
            primaryText="Home"
            leftIcon={<Home />}
          />

          <ListItemLink
            to={'/wedding'}
            primaryText="My wedding"
            leftIcon={<Assignment />}
          />

          <ListItemLink
            to={'/tasks'}
            primaryText="Tasks"
            leftIcon={<Assignment />}
          />

          <ListItemLink
            to={'/timeline'}
            primaryText="Timeline"
            leftIcon={<Timeline />}
          />


          <ListItemLink
            to={'/expenses'}
            primaryText="Expenses"
            leftIcon={<Payment />}
          />

        </List>
      </Drawer>
    );
  }
}
