import uniqueId from 'lodash/uniqueId';
import Guest from '../models/guest.model';

const createGuest = () => (new Guest({
  id: uniqueId('#guest_'),
  firstName: undefined,
  lastName: undefined,
  sex: 'M',
}));

export { createGuest };
