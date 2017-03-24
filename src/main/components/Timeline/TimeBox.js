import React, { PropTypes, PureComponent } from 'react';
import Immutable from 'immutable';

export default class TimeBox extends PureComponent {

  static propTypes = {
    elements: PropTypes.instanceOf(Immutable.Collection).isRequired,
    materialize: PropTypes.func.isRequired,
  };

  render() {
    const { materialize } = this.props;

    const renderElement = (element, index) => <li key={index}>{materialize(element)}</li>;

    return (
      <div>
        <ul>

          {
            this.props.elements.map(renderElement)
          }

        </ul>
      </div>
    );
  }

}
