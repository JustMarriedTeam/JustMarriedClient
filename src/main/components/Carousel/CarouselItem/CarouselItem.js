import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './CarouselItem.pcss';

const cx = classnames.bind(styles);

export default class CarouselItem extends Component {

  static propTypes = {
    img: PropTypes.any,
  };

  render() {
    return (
            <div className={cx('carousel-item')} style={{
              backgroundImage: `url(${this.props.img})`,
            }} />
    );
  }
}
