import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './Timeline.pcss';
import TimeBox from './TimeBox';
import TimelineModel from '../../core/models/timeline.model';
import moment from 'moment';

const cx = classNames.bind(styles);

export default class Timeline extends PureComponent {

  static propTypes = {
    atDate: PropTypes.instanceOf(moment).isRequired,
    timeline: PropTypes.instanceOf(TimelineModel).isRequired,
    renderPastTask: PropTypes.func.isRequired,
    renderFutureTask: PropTypes.func.isRequired,
  };

  render() {
    const { atDate, timeline, renderPastTask, renderFutureTask } = this.props;
    const pastTasks = timeline.getTasksBefore(atDate);
    const futureTasks = timeline.getTasksAfter(atDate);

    const sortedByDependencies = (elements) => elements.sortBy(
      (element) => [element.id, element.dependingOn],
      ([firstId, firstDependingOn], [secondId, secondDependingOn]) => {
        if (secondDependingOn.includes(firstId)) return -1;
        else if (firstDependingOn.includes(secondId)) return 1;

        const dependencyBurdenDiff = firstDependingOn.count() - secondDependingOn.count();
        if (dependencyBurdenDiff < 0) {
          return -1;
        } else if (dependencyBurdenDiff > 0) {
          return 1;
        } else {
          return firstId > secondId;
        }
      });

    const renderPastTimeBoxes = ([time, elements]) => <TimeBox
      key={time ? time.unix() : -1}
      time={time}
      elements={sortedByDependencies(elements.toSeq())}
      materialize={renderPastTask}
    />;

    const renderFutureTimeBoxes = ([time, elements]) => <TimeBox
      key={time ? time.unix() : -1}
      time={time}
      elements={sortedByDependencies(elements.toSeq())}
      materialize={renderFutureTask}
    />;

    return (
      <div className={cx('timeline')}>

        <div className={cx('timeline__past')}>
          {
            pastTasks.map(renderPastTimeBoxes)
          }
        </div>

        <div className={cx('timeline__today')}>Today ({atDate.format('L')})</div>

        <div className={cx('timeline__future')}>
          {
            futureTasks.map(renderFutureTimeBoxes)
          }
        </div>

      </div>
    );
  }

}
