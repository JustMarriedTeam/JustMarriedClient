import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './TimeBox.pcss';
import Immutable from 'immutable';

const cx = classNames.bind(styles);

export default class TimeBox extends PureComponent {

  static propTypes = {
    elements: PropTypes.instanceOf(Immutable.Collection).isRequired,
    materialize: PropTypes.func.isRequired,
  };

  render() {
    const { materialize } = this.props;

    const renderElement = (element, index) =>
      <div key={index}
        className={cx('time-box__list-item')}
      >{materialize(element)}</div>;

    return (
      <div className={cx('time-box')}>
        <div className={cx('time-box__list')}>

          {
            this.props.elements.map(renderElement)
          }

        </div>
      </div>
    );
  }

}
