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

export const normalizeWedding = (data) => normalize(data, weddingsSchema);
export const denormalizeWedding = ({ id }, entities) =>
  denormalize(id, weddingsSchema, entities);

export const normalizeParticipant = (data) => normalize(data, participantsSchema);
export const denormalizeParticipant = (participant, entities) =>
  denormalize(participant, participantsSchema, entities);
