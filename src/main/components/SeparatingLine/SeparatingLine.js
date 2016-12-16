import React, {Component, PropTypes} from "react";
import classNames from "classnames/bind";
import styles from "./SeparatingLine.pcss";

let cx = classNames.bind(styles);

export default class SeparatingLine extends Component {

    static propTypes = {
        type: PropTypes.string,
        text: PropTypes.string
    };

    render() {

        return (
            <div className={cx('separating-line', `separating-line--${this.props.type}`)}>
                <div className={cx('separating-line__stroke')}/>
                <div className={cx('separating-line__text', {
                    'separating-line__text--hidden' : !this.props.text
                })}>{ this.props.text }</div>
                <div className={cx('separating-line__stroke')}/>
            </div>
        );
    }

}
