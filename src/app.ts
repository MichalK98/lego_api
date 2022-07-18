import express from 'express';
import config from 'config';
import routes from './routes';

const port = config.get<number>('port');

const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);

  routes(app);
});
