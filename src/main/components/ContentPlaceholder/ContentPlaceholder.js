import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './ContentPlaceholder.pcss';

const cx = classNames.bind(styles);

export default class ContentPlaceholder extends PureComponent {

  static propTypes = {
    icon: PropTypes.element.isRequired,
  };

  render() {
    const { icon, children } = this.props;

    return (
      <div
        className={cx('content-placeholder')}
      >
        <div className={cx('content-placeholder__frame')}>
          <div className={cx('content-placeholder__icon')}>{icon}</div>
          <div className={cx('content-placeholder__details')}>{children}</div>
        </div>
      </div>
    );
  }

}
