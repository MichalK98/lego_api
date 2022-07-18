import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

async function connect() {
  const dbUri = config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);
    log.info('Database connected');
  } catch (e) {
    log.error('Could not connect to the database');
  }
}

export default connect;
