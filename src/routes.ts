import 'dotenv/config';
import { Express, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import validateResource from './middleware/validateResource';
import auth from './middleware/auth';
import generateAccessToken from './utils/generateAccessToken';
import {
  createPartHandler,
  deletePartHandler,
  readPartHandler,
  updatePartHandler
} from './controller/part.controller';
import { createUserHandler } from './controller/user.controller';
import { createPartSchema, updatePartSchema } from './schema/part.schema';

function routes(app: Express) {
  /* Healthcheck */
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  /* User Routes */
  app.post('/api/users', createUserHandler);

  /* Part Routes */
  app.post('/api/parts', validateResource(createPartSchema), createPartHandler);

  app.get('/api/parts', auth, readPartHandler);

  app.put(
    '/api/parts/:partId',
    validateResource(updatePartSchema),
    updatePartHandler
  );

  app.delete('/api/parts/:partId', deletePartHandler);

  /* Authorization */
  // Move to DB
  let refreshTokens: Array<string> = [];

  app.post('/token', (req: Request, res: Response) => {
    const refreshToken = req.body.token;

    if (refreshToken == null) return res.sendStatus(401);
    if (refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret) return res.sendStatus(403);

    jwt.verify(refreshToken, refreshTokenSecret, (e: any, user: any) => {
      if (e) return res.sendStatus(403);
      const accessToken = generateAccessToken({ name: user.name });
      console.log('generated new token...', refreshTokens);

      res.json({ accessToken });
    });
  });

  app.post('/login', (req: Request, res: Response) => {
    const username = req.body.username;
    const user = {
      name: username
    };

    // Generate Access Token
    const accessToken = generateAccessToken(user);

    // Generate Refresh Token
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret) return res.sendStatus(403);
    const refreshToken = jwt.sign(user, refreshTokenSecret);

    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
  });
}

export default routes;
