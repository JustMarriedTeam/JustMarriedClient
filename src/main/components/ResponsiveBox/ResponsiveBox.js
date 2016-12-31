import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './ResponsiveBox.pcss';

const cx = classnames.bind(styles);

export default class ResponsiveBox extends PureComponent {

  static propTypes = {
    children: PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  };

  render() {
    return (
      <div className={cx('responsive-box')}>
        {this.props.children}
      </div>
    );
  }

}

