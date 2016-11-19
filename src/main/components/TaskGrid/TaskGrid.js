import React, {Component, PropTypes} from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import _ from "lodash/fp";
import Task from "../task/Task";
import {createGridCols, createGridBreakpoints, createLayouts} from "../../core/grid";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class TaskGrid extends Component {

    static propTypes = {
        tasks: PropTypes.array.isRequired
    };

    constructor() {
        super();
        this.state = {
            layouts: {},
            breakpoints: createGridBreakpoints(),
            cols: createGridCols()
        };
    }

    componentDidMount() {
        this.setState({
            layouts: createLayouts(Array.from(this.props.tasks.length))
        });
    }

    render() {
        return (
            <ResponsiveReactGridLayout
                breakpoints={this.state.breakpoints}
                cols={this.state.cols}
                margin={[15, 15]}
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