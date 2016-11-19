import React, {Component} from "react";
import classNames from "classnames";
import LayoutDrawer from "./LayoutDrawer/LayoutDrawer";
import styles from "./Layout.css";

let cx = classNames.bind(styles);

export default class Layout extends Component {

    render() {

        return (
            <div className={cx('root')}>

                <LayoutDrawer />

                <main className={cx('content')}>
                    { this.props.children }
                </main>

            </div>
        );

    }

}