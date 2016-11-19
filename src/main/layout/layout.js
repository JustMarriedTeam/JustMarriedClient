import React, {PropTypes} from 'react';
import cn from 'classnames'


import Task from 'material-ui/svg-icons/social/notifications';
import UserAvatar from '../components/UserAvatar/UserAvatar'

import Assignment from 'material-ui/svg-icons/action/assessment';
import Timeline from 'material-ui/svg-icons/action/timeline';
import Payment from 'material-ui/svg-icons/action/payment';



import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Drawer from 'material-ui/Drawer';
import PersonAdd from 'material-ui/svg-icons/social/person-add';

import {blue500, yellow600} from 'material-ui/styles/colors';

import style from './layout.css';

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
            <div className={'mdl-layout mdl-layout__body mdl-js-layout ' + style.root}>

                <AppBar
                    title="Just Married"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleToggle}/>

                <Drawer
                    docked={false}
                    width={300}
                    zDepth={4}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>

                    <UserAvatar />


                    <List>
                        <ListItem
                            primaryText="Timeline"
                            leftIcon={<Timeline />}
                        />
                        <ListItem
                            primaryText="Tasks"
                            leftIcon={<Assignment />}
                            initiallyOpen={true}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                                <ListItem
                                    key={4}
                                    primaryText="All"
                                    leftIcon={<ActionGrade />}
                                />,
                                <ListItem
                                    key={1}
                                    primaryText="Waiting"
                                    leftIcon={<ActionGrade />}
                                />,
                                <ListItem
                                    key={2}
                                    primaryText="Blocked"
                                    leftIcon={<ActionGrade />}
                                />,
                                <ListItem
                                    key={3}
                                    primaryText="Completed"
                                    leftIcon={<ActionGrade />}
                                />
                            ]}
                        />
                        <ListItem
                            primaryText="Expenses"
                            leftIcon={<Payment />}
                        />

                    </List>


                </Drawer>

                <main className={style.content}>
                    testestestst
                </main>

            </div>
        );

    }
}

export default Layout;
