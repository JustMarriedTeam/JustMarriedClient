import startsWith from 'lodash/fp/startsWith';
import forOwn from 'lodash/forOwn';
import unset from 'lodash/unset';
import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';

const removeTransientIn = (value, predicate) => {
  forOwn(value, (v, k) => {
    if (isObject(v)) {
      removeTransientIn(v, predicate);
    } else {
      if (k === 'id' && !isUndefined(v) && predicate(v)) {
        unset(value, k);
      }
    }
  });
};

export function removeTransientIdentifiers(wedding) {
  removeTransientIn(wedding, startsWith('#'));
}
