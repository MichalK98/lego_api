import { object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    username: string({
      required_error: 'Username is required'
    }),
    token: string({
      required_error: 'Token is required'
    })
  })
};

export const createUserSchema = object({
  ...payload
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
