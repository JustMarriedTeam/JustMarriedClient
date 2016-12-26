import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './ContentSection.pcss';

const cx = classnames.bind(styles);

export default class ContentSection extends Component {

  static propTypes = {
    alternate: PropTypes.bool,
    header: PropTypes.any,
  };

  render() {
    return (
            <div className={cx('content-section', {
              'content-section--alternate': this.props.alternate,
            })}>
                <div className={cx('content-section__header')}>{this.props.header}</div>
                <div className={cx('content-section__separator')} />
                <div className={cx('content-section__content')}>
                    {this.props.children}
                </div>
            </div>
    );
  }
}
