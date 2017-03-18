import React, { PureComponent, PropTypes } from 'react';
import { withReflex } from 'reflexbox';
import withRobox from 'robox';

class Image extends PureComponent {

  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  render() {
    return (
      <img role="presentation" {...this.props} />
    );
  }

}

export default withRobox(withReflex()(Image));
