import React from 'react';
import Avatar from 'material-ui/Avatar';

class UserAvatar extends React.Component {

    render() {
        return (
            <div>

                <Avatar
                    size={100}
                    src="https://place-hold.it/100x100/#bbb/#fff/#eee"
                />

                Agatha

            </div>
        );
    }

}

export default UserAvatar;
