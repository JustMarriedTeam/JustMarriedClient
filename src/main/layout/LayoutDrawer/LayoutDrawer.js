import React, {Component, PropTypes} from "react";
import Drawer from "material-ui/Drawer";
import {List, ListItem} from "material-ui/List";
import Assignment from "material-ui/svg-icons/action/assessment";
import Timeline from "material-ui/svg-icons/action/timeline";
import Payment from "material-ui/svg-icons/action/payment";

export default class LayoutDrawer extends Component {

    static propTypes = {
        onToggle: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired
    };

    render() {
        return (
            <Drawer
                docked={false}
                width={300}
                zDepth={4}
                open={this.props.open}
                onRequestChange={this.props.onToggle}>

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
