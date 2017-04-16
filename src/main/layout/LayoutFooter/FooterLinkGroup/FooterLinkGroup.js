import React, {PureComponent, PropTypes} from 'react';
import {Link} from 'react-router';
import List, {ListItem} from 'material-ui/List';
import classnames from 'classnames/bind';
import styles from './FooterLinkGroup.pcss';

const cx = classnames.bind(styles);

export class FooterLinkItem extends PureComponent {

  static propTypes = {
    to: PropTypes.string.isRequired,
  };

  render() {
    return (
      <ListItem
        containerElement={
          <Link
            to={this.props.to}
            className={cx('footer-link-item')}
            activeClassName={cx('footer-link-item--active')}
          />
        }
        {...this.props}
      />
    );
  }

}

export default class FooterLinkGroup extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        <List>
          {this.props.children}
        </List>
      </div>
    );
  }

}
