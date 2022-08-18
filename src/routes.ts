import { Express, Request, Response } from 'express';
import validateResource from './middleware/validateResource';
import {
  createPartHandler,
  deletePartHandler,
  readPartHandler,
  updatePartHandler
} from './controller/part.controller';
import { createPartSchema, updatePartSchema } from './schema/part.schema';
import { requiresAuth } from 'express-openid-connect';

function routes(app: Express) {
  /* Part Routes */
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  /* Auth */
  app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

  /* Part Routes */
  app.post(
    '/api/parts',
    [validateResource(createPartSchema), requiresAuth()],
    createPartHandler
  );

  app.get('/api/parts', readPartHandler);

  app.put(
    '/api/parts/:partId',
    validateResource(updatePartSchema),
    updatePartHandler
  );

  app.delete('/api/parts/:partId', deletePartHandler);
}

export default routes;
