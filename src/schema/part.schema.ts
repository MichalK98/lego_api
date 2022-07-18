import { object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    title: string({
      required_error: 'Title is required'
    }),
    image: string({
      required_error: 'Image is required'
    })
  })
};

export const createPartSchema = object({
  ...payload
});

export type CreatePartInput = TypeOf<typeof createPartSchema>;
