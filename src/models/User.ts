import { Schema, model } from 'mongoose';
import { UserInterface } from '../types/modelTypes';

const UserSchema = new Schema<UserInterface>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default model('User', UserSchema);
