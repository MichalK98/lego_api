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

const params = {
  params: object({
    partId: string({
      required_error: 'PartId is required'
    })
  })
};

export const createPartSchema = object({
  ...payload
});

export const updatePartSchema = object({
  ...payload,
  ...params
});

export type CreatePartInput = TypeOf<typeof createPartSchema>;
export type UpdatePartInput = TypeOf<typeof updatePartSchema>;
