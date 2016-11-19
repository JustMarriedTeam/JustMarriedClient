import React, {Component, PropTypes} from 'react'
import {Responsive, WidthProvider} from 'react-grid-layout';
import _ from 'lodash/fp'
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
            }
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
                layouts={this.state.layouts}
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>

                {
                    _.map((task) => {
                        return <div key={task.id}>{task.name}</div>
                    })(this.props.tasks)
                }

            </ResponsiveReactGridLayout>
        );
    }

}