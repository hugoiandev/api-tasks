import { Schema, model } from 'mongoose';
import { TaskInterface } from '../types/modelTypes';

const TaskSchema = new Schema<TaskInterface>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    finished: { type: Boolean, default: false },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default model('Task', TaskSchema);
