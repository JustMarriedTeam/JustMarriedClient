import React, {Component, PropTypes} from "react";
import AppBar from "material-ui/AppBar";
import classNames from "classnames";
import styles from "./LayoutBar.css";

let cx = classNames.bind(styles);

export default class LayoutBar extends Component {

    static propTypes = {
        onMenuAction: PropTypes.func.isRequired,
    };

    render() {

        return (
            <AppBar
                onLeftIconButtonTouchTap={this.props.onMenuAction}
                title="JustMarried"
            />
        );

    }

}