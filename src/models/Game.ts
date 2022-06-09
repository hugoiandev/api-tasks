import { Schema, model } from 'mongoose';
import { GameInterface } from '../types/modelTypes';

const UserSchema = new Schema<GameInterface>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  locale: { type: String, required: true },
  value: { type: Number, required: true },
});

export default model('Game', UserSchema);
