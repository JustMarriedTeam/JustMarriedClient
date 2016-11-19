import React, {Component} from "react";
import classNames from "classnames";
import LayoutBar from "./LayoutBar/LayoutBar";
import LayoutDrawer from "./LayoutDrawer/LayoutDrawer";
import styles from "./Layout.css";

let cx = classNames.bind(styles);

export default class Layout extends Component {

    constructor() {
        super();
        this.state = {
            drawer: {
                open: false
            }
        };
    }

    toggleDrawer = () => {
        this.setState((prevState) => {
            return {
                drawer: {
                    open: !prevState.drawer.open
                }
            }
        })
    };

    render() {

        return (
            <div className={cx('root')}>

                <LayoutBar onMenuAction={() => this.toggleDrawer()}/>
                <LayoutDrawer open={this.state.drawer.open} onToggle={this.toggleDrawer}/>

                <main className={cx('content')}>
                    { this.props.children }
                </main>

            </div>
        );

    }

}