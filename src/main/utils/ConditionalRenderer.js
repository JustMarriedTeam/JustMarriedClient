import { PureComponent } from 'react';

class ConditionalRenderer extends PureComponent {
  render() {
    if (this.props.show) {
      return (
        this.props.children
      );
    }
    return null;
  }
}

export default ConditionalRenderer;
