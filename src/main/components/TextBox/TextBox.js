import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import styles from './TextBox.pcss';

const cx = classnames.bind(styles);

export default class TextBox extends PureComponent {

  render() {
    return (
      <p className={cx('text-box')}>

        {this.props.children}

      </p>
    );
  }

}
