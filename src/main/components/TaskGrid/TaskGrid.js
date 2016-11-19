import React, {Component, PropTypes} from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import _ from "lodash/fp";
import Task from "../task/Task";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class TaskGrid extends Component {

    static propTypes = {
        tasks: PropTypes.array.isRequired
    };

    constructor() {
        super();
        this.state = {
            layouts: {}
        };
    }

    generateLayouts = () => {
        return _.reduce((result, size) => {
            result[size] = this.generateLayout(size);
            return result;
        })({}, ['lg', 'md', 'sm', 'xs', 'xxs']);
    };

    generateLayout = () => {
        var i = 0;
        return _.map((task) => {
            return {
                i: task.id,
                x: i++,
                y: 0,
                w: 1,
                h: 1
            };

        })(this.props.tasks);
    };

    componentDidMount() {
        this.setState({
            layouts: this.generateLayouts()
        });
    }

    render() {
        return (
            <ResponsiveReactGridLayout
                rowHeight={50}
                margin={[50, 50]}
                isDraggable={false}
                isResizable={false}
                layouts={this.state.layouts}>

                {
                    _.map((task) => {
                        return (
                            <div key={task.id} style={ {width: "50px", height: "50px", backgroundColor: "red"} }>
                                <Task name={task.name}/>
                            </div>
                        );
                    })(this.props.tasks)
                }

            </ResponsiveReactGridLayout>
        );
    }

}