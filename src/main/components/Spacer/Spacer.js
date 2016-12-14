import React, {Component, PropTypes} from "react";
import classNames from "classnames/bind";
import styles from "./Spacer.css";

let cx = classNames.bind(styles);

export default class Spacer extends Component {

    static propTypes = {
        direction: PropTypes.string,
        weight: PropTypes.string
    };

    render() {
        var direction = this.props.direction || 'v';
        var weight = this.props.weight || 'md';
        return (
            <div className={cx(direction, `${direction}-${weight}`)}></div>
        );
    }

}
