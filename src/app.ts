import 'dotenv/config';
import express from 'express';
import { auth } from 'express-openid-connect';
import config from 'config';
import routes from './routes';
import connect from './utils/connect';
import logger from './utils/logger';

const port = config.get<number>('port');

const app = express();

app.use(express.json());

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  })
);

app.listen(port, async () => {
  logger.info(`Server running at http://localhost:${port}`);

  await connect();

  routes(app);
});
