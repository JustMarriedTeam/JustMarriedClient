import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import styles from './LayoutContainer.pcss';

const cx = classnames.bind(styles);

export default class LayoutContainer extends PureComponent {

  render() {
    return (
      <div
        className={cx('layout-container', {
          'layout-container--bounded': this.props.bounded,
        })}
      >{this.props.children}</div>
    );
  }
}
