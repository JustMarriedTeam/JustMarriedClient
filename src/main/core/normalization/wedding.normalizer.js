import { normalize, schema } from 'normalizr';

const user = new schema.Entity('users');

const task = new schema.Entity('tasks');

const guest = new schema.Entity('guests');

const participant = new schema.Entity('participants', {
  user,
});

const wedding = new schema.Entity('articles', {
  tasks: [task],
  participants: [participant],
  guests: [guest],
  owners: [user],
});

const normalizeWedding = (data) => normalize(data, wedding);

export { normalizeWedding };
