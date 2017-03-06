import React, { Component, PropTypes } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import times from 'lodash/fp/times';
import Task from '../Task/Task';
import { createGridCols, createGridBreakpoints, createLayouts } from '../../core/grid';
import Immutable from 'immutable';

const ResponsiveReactGridLayout = new WidthProvider(Responsive);

export default class TaskGrid extends Component {

  static propTypes = {
    tasks: PropTypes.instanceOf(Immutable.List).isRequired,
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
    const layouts = createLayouts(times((i) => i)(props.tasks.size));
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
          this.props.tasks.map((task) => <div key={`${task.id}`}>
            <Task task={task} />
          </div>)
        }

      </ResponsiveReactGridLayout>
    );
  }

}
