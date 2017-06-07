import React, {PureComponent} from 'react';

class ConditionalRenderer extends PureComponent {
  render() {
    if (this.props.show) {
      return (
        <div>
          { this.props.children }
        </div>
      );
    }
    return <div />;
  }
}

export default ConditionalRenderer;
