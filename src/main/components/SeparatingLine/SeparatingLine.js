import React, { Component, PropTypes } from 'react';
import { withReflex } from 'reflexbox';
import Robox from 'robox';
import classNames from 'classnames/bind';
import styles from './SeparatingLine.pcss';

const cx = classNames.bind(styles);

class SeparatingLine extends Component {

  static propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
  };

  render() {
    return (
            <div className={cx('separating-line', `separating-line--${this.props.type}`)}>
                <div className={cx('separating-line__stroke')} />
                <div className={cx('separating-line__text', {
                  'separating-line__text--hidden': !this.props.text,
                })}>
                    <div>{this.props.text}</div>
                </div>
                <div className={cx('separating-line__stroke')} />
            </div>
    );
  }

}

export default withReflex()(Robox(SeparatingLine));

