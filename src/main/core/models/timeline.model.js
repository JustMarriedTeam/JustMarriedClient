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

const groupByDateOrUseEmpty = (tasks) => { // eslint-disable-line arrow-body-style
  return !!tasks.find((task) => !!task.deadlineDate)
    ? groupByDate(tasks)
    : new Immutable.List();
};

const TimelineRecord = new Immutable.Record({
  tasks: [],
  filter: () => true,
});

class Timeline extends TimelineRecord {

  constructor({ tasks, filter }) {
    super({ tasks: groupByDateOrUseEmpty(tasks), filter });
  }

  isAvailable() {
    return !this.tasks.isEmpty();
  }

  filteredBy(filter) {
    return this.set('filter', filter);
  }

  getTasksBefore(selectedDate) {
    const tasks = this.get('tasks');
    return tasks
      .map((taskList) => taskList.filter(this.filter))
      .filter((taskList, date) => selectedDate.isAfter(date))
      .entrySeq();
  }

  getTasksAfter(selectedDate) {
    const tasks = this.get('tasks');
    return tasks
      .map((taskList) => taskList.filter(this.filter))
      .filter((taskList, date) => selectedDate.isBefore(date))
      .entrySeq();
  }

}

export default Timeline;
