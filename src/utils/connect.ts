import mongoose from 'mongoose';
import config from 'config';

async function connect() {
  const dbUri = config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);
    console.log('Database connected');
  } catch (e) {
    console.log('Could not connect to the database');
  }
}

export default connect;
