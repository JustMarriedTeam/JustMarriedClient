import { normalize, denormalize } from 'normalizr';
import { participantsSchema } from './schema';

export const normalizeParticipant = (data) => normalize(data, participantsSchema);
export const denormalizeParticipant = (participant, entities) =>
  denormalize(participant, participantsSchema, entities);
