import map from 'lodash/fp/map';
import isString from 'lodash/isString';

export const mapToIds = map((entityOrId) => // eslint-disable-line
  isString(entityOrId) ? entityOrId : entityOrId.id);
