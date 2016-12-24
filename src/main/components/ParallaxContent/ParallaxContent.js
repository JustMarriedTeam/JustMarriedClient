import React, {Component, PropTypes} from "react";
import ResponsiveBox from '../ResponsiveBox'
import classnames from "classnames/bind";
import styles from "./ParallaxContent.pcss";

const cx = classnames.bind(styles);

export default class ParallaxContent extends Component {

    static propTypes = {
        img: PropTypes.any.isRequired,
        height: PropTypes.string
    };

    render() {

        return (
            <div className={cx('parallax-content')} style={{
                backgroundImage: `url(${this.props.img})`
            }}>
                <div className={cx('parallax-content__content-placeholder')}>
                    <ResponsiveBox>
                        <div className={cx('parallax-content__content')}>{ this.props.children }</div>
                    </ResponsiveBox>
                </div>
            </div>
        );


    }
}
