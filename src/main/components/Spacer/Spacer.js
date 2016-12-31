import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './Spacer.pcss';

const cx = classNames.bind(styles);

export default class Spacer extends PureComponent {

  static propTypes = {
    direction: PropTypes.string,
    weight: PropTypes.string,
  };

  render() {
    const direction = this.props.direction || 'v';
    const weight = this.props.weight || 'md';
    return (
      <div className={cx(direction, `${direction}-${weight}`)}></div>
    );
  }

}
