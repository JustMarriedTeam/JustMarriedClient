import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './ResponsiveBox.pcss';

const cx = classnames.bind(styles);

export default class ResponsiveBox extends Component {

  render() {
    return (
            <div className={cx('responsive-box')}>
                {this.props.children}
            </div>
    );
  }
}
