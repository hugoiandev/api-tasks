import { Schema, model } from 'mongoose';
import { MatchInterface } from '../types/modelTypes';

const UserSchema = new Schema<MatchInterface>(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    locale: { type: String, required: true },
    value: { type: Number, required: true },
    receiver: { type: String, required: true },
    players: { type: [], default: [] },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default model('Game', UserSchema);
