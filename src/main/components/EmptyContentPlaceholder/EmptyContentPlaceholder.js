import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './EmptyContentPlaceholder.pcss';

const cx = classNames.bind(styles);

export default class EmptyContentPlaceholder extends PureComponent {

  static propTypes = {
    icon: PropTypes.element.isRequired,
  };

  render() {
    const { icon } = this.props;

    return (
      <div
        className={cx('empty-content-placeholder')}
      >
        <div className={cx('empty-content-placeholder__frame')}>
          <div className={cx('empty-content-placeholder__icon')}>{icon}</div>
          <div className={cx('empty-content-placeholder__description')}>{this.props.children}</div>
        </div>
      </div>
    );
  }

}
