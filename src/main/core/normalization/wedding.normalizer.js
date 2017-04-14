import { normalize, denormalize } from 'normalizr';
import { weddingsSchema } from './schema';

export const normalizeWedding = (data) => normalize(data, weddingsSchema);
export const denormalizeWedding = ({ id }, entities) =>
  denormalize(id, weddingsSchema, entities);
