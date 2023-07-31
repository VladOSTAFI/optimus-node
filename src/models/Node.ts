import mongoose, { Document, model, Model, Schema } from 'mongoose';

import { INode, ProjectIds } from '@/common';
import { IDBServer } from '@/models/Server';

export interface IDBNode extends Omit<INode, 'id' | 'serverId'>, Document {
  server: IDBServer;
}

const NodeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    enum: Object.values(ProjectIds),
    required: true,
  },
  server: {
    type: Schema.Types.ObjectId,
    ref: 'Server',
    required: true,
  },
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

export const Node = (mongoose.models.Node ||
  model('Node', NodeSchema)) as Model<IDBNode>;
