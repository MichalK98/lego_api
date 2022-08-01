import { Express, Request, Response } from 'express';
import validateResource from './middleware/validateResource';
import {
  createPartHandler,
  readPartHandler,
  updatePartHandler
} from './controller/part.controller';
import { createPartSchema, updatePartSchema } from './schema/part.schema';

function routes(app: Express) {
  /* Part Routes */
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  /* Part Routes */
  app.post('/api/parts', validateResource(createPartSchema), createPartHandler);

  app.get('/api/parts', readPartHandler);

  app.put(
    '/api/parts/:partId',
    validateResource(updatePartSchema),
    updatePartHandler
  );
}

export default routes;
