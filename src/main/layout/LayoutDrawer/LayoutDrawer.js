import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
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
                    <Link to={'/tasks'}>
                        <ListItem
                            primaryText="Tasks"
                            leftIcon={<Assignment />}
                        />
                    </Link>

                    <Link to={'/timeline'}>
                        <ListItem
                            primaryText="Timeline"
                            leftIcon={<Timeline />}
                        />
                    </Link>

                    <Link to={'/expenses'}>
                        <ListItem
                            primaryText="Expenses"
                            leftIcon={<Payment />}
                        />
                    </Link>

                    <Link to={'/about'}>
                        <ListItem
                            primaryText="About"
                            leftIcon={<Payment />}
                        />
                    </Link>

                </List>
            </Drawer>
        );


    }
}
