import { Request, response, Response } from 'express';
import { CreatePartInput } from '../schema/part.schema';
import { createPart } from '../service/part.service';

export async function CreateProductHandler(
  req: Request<{}, {}, CreatePartInput['body']>,
  res: Response
) {
  const body = req.body;

  const part = await createPart({ ...body });

  return res.send(part);
}
