import uniqueId from 'lodash/uniqueId';

const createGuest = () => ({
  id: uniqueId('guest_'),
  firstName: undefined,
  lastName: undefined,
  sex: 'male',
});

export { createGuest };
