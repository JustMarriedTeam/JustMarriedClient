import isEmpty from 'lodash/isEmpty';

export const required = value => isEmpty(value) ? 'Required' : undefined; //eslint-disable-line

export const firstName = value => !/^[A-Z][a-z]{1,30}$/i.test(value) ? 'Type valid first name' : undefined; //eslint-disable-line

export const lastName = value => !/^[A-Z][a-z]{1,30}$/i.test(value) ? 'Type valid last name' : undefined; //eslint-disable-line

export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email' : undefined; //eslint-disable-line
