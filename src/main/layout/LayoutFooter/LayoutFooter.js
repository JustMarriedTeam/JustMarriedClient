import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import styles from './LayoutFooter.css';

const cx = classnames.bind(styles);

export default class LayoutFooter extends PureComponent {

  render() {
    return (
      <div className={cx('layout-footer')}>

      </div>
    );
  }
}
