import { normalize, denormalize, schema } from 'normalizr';

const user = new schema.Entity('users');

const task = new schema.Entity('tasks');

const guest = new schema.Entity('guests');

const participantsSchema = new schema.Entity('participants', {
  user,
});

const weddingsSchema = new schema.Entity('weddings', {
  tasks: [task],
  participants: [participantsSchema],
  guests: [guest],
  owners: [user],
});

const normalizeWedding = (data) => normalize(data, weddingsSchema);
const denormalizeWedding = ({ id }, entities) =>
  denormalize(id, weddingsSchema, entities);

const normalizeParticipant = (data) => normalize(data, participantsSchema);
const denormalizeParticipant = ({ id }, entities) =>
  denormalize(id, participantsSchema, entities);

export {
  normalizeWedding,
  denormalizeWedding,
  normalizeParticipant,
  denormalizeParticipant,
};
