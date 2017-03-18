import isEmpty from 'lodash/isEmpty';

export const validateIf = (condition) => (validation) => condition ? validation : []; // eslint-disable-line

export const required = value => isEmpty(value) ? 'Required' : undefined; //eslint-disable-line
