import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './TitleModalHeader.pcss';

const cx = classNames.bind(styles);

export default class TitleModalHeader extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={cx('title-modal-header')}>
        <div className={cx('title-modal-header__title')}>
          <h5>{this.props.title}</h5>
        </div>
      </div>
    );
  }

}
