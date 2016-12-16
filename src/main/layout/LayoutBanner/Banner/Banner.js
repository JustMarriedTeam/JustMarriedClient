import React, {Component, PropTypes} from "react";
import classnames from "classnames/bind";
import styles from "./Banner.pcss";

const cx = classnames.bind(styles);

export default class Banner extends Component {

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
