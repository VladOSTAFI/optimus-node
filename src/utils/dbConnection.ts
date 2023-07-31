import { connect, connection } from 'mongoose';

const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const connectToDatabase = async () => {
  if (!process.env.MONGO_DB_CONNECTION_STRING) {
    throw Error('Specify env variable: MONGO_DB_CONNECTION_STRING');
  }

  if (!connection.readyState) {
    connect(process.env.MONGO_DB_CONNECTION_STRING, options);
  }
};
