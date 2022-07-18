import { Express, Request, Response } from 'express';
import { CreatePartHandler } from './controller/part.controller';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  /* Part Routes */
  app.post('/api/part', CreatePartHandler);
}

export default routes;
