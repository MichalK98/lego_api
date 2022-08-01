import { Request, Response } from 'express';
import { CreatePartInput, UpdatePartInput } from '../schema/part.schema';
import {
  createPart,
  deletePart,
  findAndUpdatePart,
  findPart,
  getParts
} from '../service/part.service';

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

export async function updatePartHandler(
  req: Request<UpdatePartInput['params']>,
  res: Response
) {
  const partId = req.params.partId;
  const update = req.body;

  const part = await findPart({ partId });

  if (!part) return res.sendStatus(404);

  const updatePart = await findAndUpdatePart({ partId }, update, { new: true });

  return res.send(updatePart);
}

export async function deletePartHandler(
  req: Request<UpdatePartInput['params']>,
  res: Response
) {
  const partId = req.params.partId;

  const part = await findPart({ partId });

  if (!part) return res.sendStatus(404);

  await deletePart({ partId });

  return res.sendStatus(200);
}
