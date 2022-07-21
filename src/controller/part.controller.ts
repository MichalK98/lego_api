import { Request, Response } from 'express';
import { CreatePartInput } from '../schema/part.schema';
import { createPart, getParts } from '../service/part.service';

export async function createPartHandler(
  req: Request<{}, {}, CreatePartInput['body']>,
  res: Response
) {
  const body = req.body;

  const part = await createPart({ ...body });

  return res.send(part);
}

export async function readPartHandler(req: Request, res: Response) {
  const query = req.query;

  const parts = await getParts(query);

  return res.send(parts);
}
