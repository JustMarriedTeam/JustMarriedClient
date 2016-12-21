import React, {Component, PropTypes} from "react";
import classnames from "classnames/bind";
import styles from "./BannerSlide.pcss";

const cx = classnames.bind(styles);

export default class BannerSlide extends Component {

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
