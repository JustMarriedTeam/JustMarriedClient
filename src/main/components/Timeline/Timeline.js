import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './Timeline.pcss';
import Immutable from 'immutable';
import TimeBox from './TimeBox';
import moment from 'moment';
import isUndefined from 'lodash/isUndefined';

const cx = classNames.bind(styles);

const byDatesInOrder = (firstDate, secondDate) => firstDate.isAfter(secondDate);

export default class Timeline extends PureComponent {

  static propTypes = {
    currentTime: PropTypes.instanceOf(moment).isRequired,
    elements: PropTypes.instanceOf(Immutable.Collection).isRequired,
    materializeElement: PropTypes.func.isRequired,
  };

  tryToFindEarliestDeadlineAmong = (tasks) =>
    tasks
      .map(task => task.deadlineDate)
      .filterNot(isUndefined)
      .sort(byDatesInOrder)
      .first();

  findEarliestDeadlineOf = (tasks) => {
    const firstDeadline = this.tryToFindEarliestDeadlineAmong(tasks);
    if (firstDeadline) {
      return firstDeadline;
    } else {
      return tasks.map((task) => this.findEarliestDeadlineOf(task.getDependentTasks()))
        .filterNot(isUndefined)
        .sort(byDatesInOrder)
        .first();
    }
  };

  boundToTime = (elements) => elements.map((element) => {
    const { completionDate, deadlineDate } = element;
    if (completionDate) {
      return [completionDate, element];
    } else if (deadlineDate) {
      return [deadlineDate, element];
    } else {
      return [this.findEarliestDeadlineOf(element.getDependentTasks()), element];
    }
  });

  render() {
    const { currentTime } = this.props;
    const btt = this.boundToTime(this.props.elements);
    const timedElements = btt
      .groupBy(element => element[0])
      .sortBy(
        (value, date) => date,
        (firstDate, secondDate) => firstDate.isAfter(secondDate)
      )
      .map((entryList) => entryList.map((timedTask) => timedTask[1]))
      .entrySeq();

    const renderPastTimeBoxes = ([time, elements]) => {
      console.log('x');
      return (<TimeBox
        key={time ? time.unix() : -1}
        time={time}
        elements={elements}
        materialize={this.props.materializeElement}
      />);
    };

    const renderFutureTimeBoxes = ([time, elements]) => {
      console.log('x');
      return (<TimeBox
        key={time ? time.unix() : -1}
        time={time}
        elements={elements}
        materialize={this.props.materializeElement}
      />);
    };

    return (
      <div className={cx('timeline')}>

        <div className={cx('timeline__past')}>
          {
            timedElements
              .filter((element, date) => currentTime.isAfter(date))
              .map(renderPastTimeBoxes)
          }
        </div>

        <div className={cx('timeline__today')}>{currentTime.format('L')}</div>

        <div className={cx('timeline__future')}>
          {
            timedElements
              .filter((element, date) => currentTime.isBefore(date))
              .map(renderFutureTimeBoxes)
          }
        </div>

      </div>
    );
  }

}
