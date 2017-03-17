import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './ExpandableIconElement.pcss';

const cx = classNames.bind(styles);

export default class ExpandableIconElement extends PureComponent {

  static propTypes = {
    expanded: PropTypes.bool.isRequired,
    icon: PropTypes.element.isRequired,
  };

  render() {
    const { expanded, icon } = this.props;

    return (
      <div
        className={cx('expandable-icon-element', {
          'expandable-icon-element--expanded': expanded,
        })}
      >
        <div className={cx('expandable-icon-element__element')}>{this.props.children}</div>
        <div className={cx('expandable-icon-element__icon')}>{icon}</div>
      </div>
    );
  }

}
