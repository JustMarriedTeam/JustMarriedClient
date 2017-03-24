import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './Timeline.pcss';
import Immutable from 'immutable';
import TimeBox from './TimeBox';

const cx = classNames.bind(styles);

export default class Timeline extends PureComponent {

  static propTypes = {
    elements: PropTypes.instanceOf(Immutable.Collection).isRequired,
    materializeElement: PropTypes.func.isRequired,
  };

  getTimeBoxes = () => {
    console.log('converting');
    return this.props.elements
      .groupBy(e => e.deadlineDate)
      .sortBy((v, k) => k, (k1, k2) => k1 ? k1.isBefore(k2) : -1)
      .toKeyedSeq();
  };

  render() {
    const renderTimeBoxes = (elements, time) => <TimeBox
      key={time ? time.unix() : -1}
      time={time}
      elements={elements}
      materialize={this.props.materializeElement}
    />;

    return (
      <div className={cx('timeline')}>

          {
            this.getTimeBoxes().map(renderTimeBoxes)
          }

      </div>
    );
  }

}
