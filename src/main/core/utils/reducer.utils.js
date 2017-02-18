import map from 'lodash/fp/map';
import isString from 'lodash/isString';

export const mapToIds = map((entityOrId) =>
  isString(entityOrId) ? entityOrId : entityOrId.id);
