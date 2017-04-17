import { schema } from 'normalizr';


export const taskSchema = new schema.Entity('tasks');

export const taskListSchema = new schema.Array(taskSchema);

export const userSchema = new schema.Entity('users');

export const guestSchema = new schema.Entity('guests');

export const participantsSchema = new schema.Entity('participants', {
  user: userSchema,
});

export const weddingsSchema = new schema.Entity('weddings', {
  participants: [participantsSchema],
  guests: [guestSchema],
  owners: [userSchema],
});
