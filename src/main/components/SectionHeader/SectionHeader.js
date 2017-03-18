import React, {PureComponent, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from './SectionHeader.pcss';

const cx = classNames.bind(styles);

export default class SectionHeader extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    hideTitle: PropTypes.bool.isRequired,
    leftIcon: PropTypes.element,
    rightIcon: PropTypes.element,
  };

  render() {
    return (
      <div
        className={cx('section-header', {
          'section-header--title-collapse': this.props.hideTitle,
        })}
      >
        <div className={cx('section-header__row')}>
          <div className={cx('section-header__left-icon')}>{this.props.leftIcon}</div>
          <div className={cx('section-header__title')}>{this.props.title}</div>
          <div className={cx('section-header__right-icon')}>{this.props.rightIcon}</div>
        </div>
        <div className={cx('section-header__row')}>
          <div className={cx('section-header__underline')}/>
        </div>
      </div>
    );
  }

}
