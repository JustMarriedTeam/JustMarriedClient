import React, {Component, PropTypes} from "react";
import AppBar from "material-ui/AppBar";
import classNames from "classnames/bind";
import styles from "./LayoutBar.css";

let cx = classNames.bind(styles);

export default class LayoutBar extends Component {

    static propTypes = {
        onMenuAction: PropTypes.func.isRequired,
    };

    render() {

        return (
            <AppBar
                className={cx('layout-bar')}
                onLeftIconButtonTouchTap={this.props.onMenuAction}
                title="JustMarried"
            />
        );

    }

}