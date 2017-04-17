import React, { PureComponent, PropTypes } from 'react';
import { withReflex } from 'reflexbox';
import withRobox from 'robox';
import classnames from 'classnames/bind';
import styles from './Image.pcss';

const cx = classnames.bind(styles);

class Image extends PureComponent {

  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  render() {
    return (
      <img
        role="presentation"
        className={cx('image')}
        {...this.props}
      />
    );
  }

}

export default withRobox(withReflex()(Image));
