import React, {Component, PropTypes} from "react";
import classnames from "classnames/bind";
import Slider from "react-slick";
import CarouselItem from "./CarouselItem/CarouselItem";
import styles from "./Carousel.pcss";

const cx = classnames.bind(styles);

// http://www.bucketlistly.com/

export default class Carousel extends Component {

    render() {

        const slickConfig = {
            dots: true,
            slidesToShow: 1,
            centerMode: true,
            slidesToScroll: 1,
            adaptiveHeight: false,
            variableWidth: false,
            centerPadding: '0'
        };

        const coverStyle = {
            width: '100%',
            height: '875px',
        };

        return (
            <div className={cx('layout-banner')}>
                <Slider className={cx('layout-banner__slider')} {...slickConfig}>

                    <div style={coverStyle}>
                        <CarouselItem img='abc' />
                    </div>

                </Slider>
            </div>
        );


    }
}
