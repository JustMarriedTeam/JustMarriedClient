import React, {Component, PropTypes} from "react";
import classNames from "classnames/bind";
import styles from "./SeparatingLine.css";

let cx = classNames.bind(styles);

export default class SeparatingLine extends Component {

    static propTypes = {
        marginTop: PropTypes.string,
        marginBottom: PropTypes.string
    };

    render() {
        return (
            <div style={{ marginTop: this.props.marginTop
            || "5px", marginBottom: this.props.marginBottom || "5px" }}
                 className={cx('separating-line')}>
                <div className={cx('separating-line')}/>
            </div>
        );
    }

}
