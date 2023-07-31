import mongoose, { Document, model, Model, Schema } from 'mongoose';

import { IServer } from '@/common';

export interface IDBServer extends Omit<IServer, 'id'>, Document {}

const ServerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Server = (mongoose.models.Server ||
  model('Server', ServerSchema)) as Model<IDBServer>;
