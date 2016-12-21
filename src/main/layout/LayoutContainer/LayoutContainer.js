import React, {Component, PropTypes} from "react";
import classnames from "classnames/bind";
import styles from "./LayoutContainer.pcss";

const cx = classnames.bind(styles);

export default class LayoutContainer extends Component {

    render() {

        return (
            <div className={cx('layout-container')}>{this.props.children}</div>
        );


    }
}
