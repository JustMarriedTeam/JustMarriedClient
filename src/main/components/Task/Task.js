import React, {Component, PropTypes} from "react";
import {Card, CardMedia, CardTitle} from "material-ui/Card";


export default class Task extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired
    };

    render() {
        return (
            <Card>
                <CardMedia
                    overlay={<CardTitle title={this.props.name} subtitle="Overlay subtitle"/>}
                >
                    <img src="http://meetingking.com/wp-content/images/meetingking_tasks.png"/>
                </CardMedia>
            </Card>
        );
    }

}
