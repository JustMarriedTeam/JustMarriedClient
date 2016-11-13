import React, {PropTypes} from 'react';
import cn from 'classnames'


import Avatar from 'material-ui/Avatar';
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

                    {/*<Avatar*/}
                        {/*color={deepOrange300}*/}
                        {/*backgroundColor={purple500}*/}
                        {/*size={90}*/}
                        {/*style={style}*/}
                    {/*>*/}
                        {/*G*/}
                    {/*</Avatar>*/}

                    <Divider />

                    <List>
                        <Subheader>Guests</Subheader>
                        <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                        <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
                        <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                        <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                        <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                    </List>

                    <Divider />

                    <List>
                        <Subheader>Planner</Subheader>
                        <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                        <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
                        <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                        <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                        <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                    </List>

                    <Divider />

                    <List>
                        <Subheader>Settings</Subheader>
                        <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                        <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
                        <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                        <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                        <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                    </List>

                    <Divider />

                    <List>
                        <Subheader>Folders</Subheader>
                        <ListItem
                            leftAvatar={<Avatar icon={<FileFolder />} />}
                            rightIcon={<ActionInfo />}
                            primaryText="Photos"
                            secondaryText="Jan 9, 2014"
                        />
                        <ListItem
                            leftAvatar={<Avatar icon={<FileFolder />} />}
                            rightIcon={<ActionInfo />}
                            primaryText="Recipes"
                            secondaryText="Jan 17, 2014"
                        />
                        <ListItem
                            leftAvatar={<Avatar icon={<FileFolder />} />}
                            rightIcon={<ActionInfo />}
                            primaryText="Work"
                            secondaryText="Jan 28, 2014"
                        />
                    </List>

                    {/*<Menu>*/}
                        {/*<MenuItem onTouchTap={this.handleClose} primaryText="Preview" leftIcon={<PersonAdd />}/>*/}
                        {/*<MenuItem onTouchTap={this.handleClose} primaryText="Share" leftIcon={<PersonAdd />}/>*/}
                        {/*<MenuItem primaryText="Get links" leftIcon={<PersonAdd />}/>*/}
                        {/*<Divider />*/}
                        {/*<MenuItem primaryText="Make a copy" leftIcon={<PersonAdd />}/>*/}
                        {/*<MenuItem primaryText="Download" leftIcon={<PersonAdd />}/>*/}
                        {/*<Divider />*/}
                        {/*<MenuItem primaryText="Remove" leftIcon={<PersonAdd />}/>*/}
                    {/*</Menu>*/}

                </Drawer>

                <main className={style.content}>
                    testestestst
                </main>

            </div>
        );

    }
}

export default Layout;
