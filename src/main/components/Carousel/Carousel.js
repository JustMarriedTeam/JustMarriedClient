import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import Slider from 'react-slick';
import map from 'lodash/fp/map';
import styles from './Carousel.pcss';

const cx = classnames.bind(styles);

// http://www.bucketlistly.com/

export default class Carousel extends PureComponent {

  render() {
    const slickConfig = {
      dots: true,
      slidesToShow: 1,
      centerMode: true,
      slidesToScroll: 1,
      adaptiveHeight: false,
      variableWidth: false,
      centerPadding: '0',
      fade: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4000,
    };

    return (
      <Slider className={cx('carousel')} {...slickConfig}>

        {map((element) => <div
          key={element.key}
          className={cx('carousel--item-wrapper')}
          style={{
            height: '400px',
          }}
        >{element}</div>)(this.props.children)}

      </Slider>
    );
  }
}
