import React, {Component, PropTypes} from "react";
import classnames from 'classnames/bind'
import Slider from 'react-slick';
import styles from './LayoutBanner.pcss'

const cx = classnames.bind(styles);

export default class LayoutBanner extends Component {

    render() {

        const slickConfig = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div className={cx('layout-banner')}>
                <Slider className={cx('layout-banner__slider')} {...slickConfig}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </Slider>
            </div>
        );


    }
}
