import { normalize, schema } from 'normalizr';
import { denormalize } from 'denormalizr';

const user = new schema.Entity('users');

const task = new schema.Entity('tasks');

const guest = new schema.Entity('guests');

const participant = new schema.Entity('participants', {
  user,
});

const weddingsSchema = new schema.Entity('weddings', {
  tasks: [task],
  participants: [participant],
  guests: [guest],
  owners: [user],
});

const normalizeWedding = (data) => normalize(data, weddingsSchema);
const denormalizeWedding = (wedding, entities) =>
  denormalize(wedding, entities, weddingsSchema);

export { normalizeWedding, denormalizeWedding };
