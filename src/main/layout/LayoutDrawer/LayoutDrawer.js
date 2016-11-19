import React, {Component, PropTypes} from "react";
import Drawer from "material-ui/Drawer";
import {List, ListItem} from "material-ui/List";
import Assignment from "material-ui/svg-icons/action/assessment";
import Timeline from "material-ui/svg-icons/action/timeline";
import Payment from "material-ui/svg-icons/action/payment";

export default class LayoutDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = (open) => this.setState({open: open});

    render() {
        return (
            <Drawer
                docked={false}
                width={300}
                zDepth={4}
                open={this.state.open}
                onRequestChange={this.handleToggle}>

                <List>
                    <ListItem
                        primaryText="Tasks"
                        leftIcon={<Assignment />}
                        initiallyOpen={true}
                    />
                    <ListItem
                        primaryText="Timeline"
                        leftIcon={<Timeline />}
                    />
                    <ListItem
                        primaryText="Expenses"
                        leftIcon={<Payment />}
                    />
                </List>
            </Drawer>
        );


    }
}
