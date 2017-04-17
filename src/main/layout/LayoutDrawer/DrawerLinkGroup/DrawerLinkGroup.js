import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import List, { ListItem } from 'material-ui/List';
import classnames from 'classnames/bind';
import styles from './DrawerLinkGroup.pcss';

const cx = classnames.bind(styles);


export class DrawerLinkItem extends PureComponent {

  static propTypes = {
    to: PropTypes.string.isRequired,
  };

  render() {
    return (
      <ListItem
        containerElement={
          <Link
            to={this.props.to}
            className={cx('drawer-link-item')}
            activeClassName={cx('drawer-link-item--active')}
          />
        }
        {...this.props}
      />
    );
  }

}

export default class DrawerLinkGroup extends PureComponent {

  render() {
    return (
      <List>
        {this.props.children}
      </List>
    );
  }

}
