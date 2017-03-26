import Immutable from 'immutable';
import isUndefined from 'lodash/isUndefined';

const byDatesInOrder = (firstDate, secondDate) => firstDate.isAfter(secondDate);

const tryToFindEarliestDeadlineAmong = (tasks) =>
  tasks
    .map(task => task.deadlineDate)
    .filterNot(isUndefined)
    .sort(byDatesInOrder)
    .first();

const findEarliestDeadlineOf = (tasks) => {
  const firstDeadline = tryToFindEarliestDeadlineAmong(tasks);
  if (firstDeadline) {
    return firstDeadline;
  } else {
    return tasks.map((task) => findEarliestDeadlineOf(task.getDependentTasks()))
      .filterNot(isUndefined)
      .sort(byDatesInOrder)
      .first();
  }
};

const boundToDate = (elements) => elements.map((element) => {
  const { completionDate, deadlineDate } = element;
  if (completionDate) {
    return [completionDate, element];
  } else if (deadlineDate) {
    return [deadlineDate, element];
  } else {
    return [findEarliestDeadlineOf(element.getDependentTasks()), element];
  }
});

const groupByDate = (tasks) => {
  const btd = boundToDate(new Immutable.Set(tasks));
  return btd
    .groupBy(element => element[0])
    .map((entryList) => entryList.map((timedTask) => timedTask[1]))
    .sortBy(
      (value, date) => date,
      (firstDate, secondDate) => firstDate.isAfter(secondDate)
    );
};


const TimelineRecord = new Immutable.Record({
  tasks: [],
});

class Timeline extends TimelineRecord {

  constructor({ tasks }) {
    super({ tasks: groupByDate(tasks) });
  }

  getTasksBefore = (selectedDate) => {
    const tasks = this.get('tasks');
    return tasks.entrySeq()
      .filter((element, date) => selectedDate.isAfter(date));
  };

  getTasksAfter = (selectedDate) => this.get('tasks').entrySeq()
    .filter((element, date) => selectedDate.isBefore(date));

}

export default Timeline;
