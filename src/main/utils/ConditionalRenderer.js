import React, { PureComponent } from 'react';

class ConditionalRenderer extends PureComponent {
  render() {
    if (this.props.show) {
      return (
        this.props.children
      );
    }
    return <div />;
  }
}

export default ConditionalRenderer;
