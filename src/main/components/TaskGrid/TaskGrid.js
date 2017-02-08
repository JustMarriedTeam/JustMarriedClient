import React, { Component, PropTypes } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import _ from 'lodash/fp';
import Task from '../Task/Task';
import { createGridCols, createGridBreakpoints, createLayouts } from '../../core/grid';

const ResponsiveReactGridLayout = new WidthProvider(Responsive);

export default class TaskGrid extends Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
  };

  constructor() {
    super();
    this.state = {
      layouts: {},
      breakpoints: createGridBreakpoints(),
      cols: createGridCols(),
    };
  }

  componentWillReceiveProps(props) {
    const layouts = createLayouts(_.times((i) => i)(props.tasks.length));
    this.setState({
      layouts,
    });
  }

  render() {
    return (
      <ResponsiveReactGridLayout
        breakpoints={this.state.breakpoints}
        cols={this.state.cols}
        margin={[15, 15]}
        rowHeight={320}
        isDraggable={false}
        isResizable={false}
        layouts={this.state.layouts}
      >

        {
          _.map.convert({ cap: false })((task, idx) => (
            <div key={`${idx}`}>
              <Task name={task.name} />
            </div>
          ))(this.props.tasks)
        }

      </ResponsiveReactGridLayout>
    );
  }

}
