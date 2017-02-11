import { normalize, denormalize, schema } from 'normalizr';

const user = new schema.Entity('users');

const task = new schema.Entity('tasks');

const guest = new schema.Entity('guests');

const participant = new schema.Entity('participants', {
  user,
});

const weddings = new schema.Entity('weddings', {
  tasks: [task],
  participants: [participant],
  guests: [guest],
  owners: [user],
});

const normalizeWedding = (data) => normalize(data, weddings);
const denormalizeWedding = (data, entity) => denormalize(data, weddings, entity);

export { normalizeWedding, denormalizeWedding };
