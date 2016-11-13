import React, {PropTypes} from 'react';
import cn from 'classnames'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import styles from './layout.css';

class Layout extends React.Component {

    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});


    render() {

        return (
            <div className={'mdl-layout mdl-layout__body mdl-js-layout ' + styles.root}>

                <AppBar
                    title="Just Married"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleToggle} />

                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
                </Drawer>

                <main className={styles.content}>
                    testestestst
                </main>

            </div>
        );

    }
}

export default Layout;
