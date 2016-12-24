import React, {Component, PropTypes} from "react";
import classnames from "classnames/bind";
import Slider from "react-slick";
import map from "lodash/fp/map";
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

        return (
            <Slider className={cx('carousel')} {...slickConfig}>

                { map((element) => {
                    return <div key={element.key} style={{
                        height: '500px'
                    }}  className={cx('carousel--item-wrapper')}>{element}</div>
                })(this.props.children) }

            </Slider>
        );


    }
}
