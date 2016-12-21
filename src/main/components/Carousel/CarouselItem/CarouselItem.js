import React, {Component, PropTypes} from "react";
import classnames from "classnames/bind";
import styles from "./CarouselItem.pcss";

const cx = classnames.bind(styles);

export default class CarouselItem extends Component {

    static propTypes = {
        img: PropTypes.string.isRequired
    };

    render() {

        return (
            <div className={cx('banner')} style={{
                backgroundImage: `url(${this.props.img})`
            }}/>
        );


    }
}
