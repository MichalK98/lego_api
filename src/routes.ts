import { Express, Request, Response } from 'express';
import validateResource from './middleware/validateResource';
import { CreatePartHandler } from './controller/part.controller';
import { createPartSchema } from './schema/part.schema';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  /* Part Routes */
  app.post('/api/part', validateResource(createPartSchema), CreatePartHandler);
}

export default routes;
