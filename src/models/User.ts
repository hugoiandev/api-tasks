import { Schema, model } from 'mongoose';
import { UserInterface } from '../types/modelTypes';

const UserSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model('User', UserSchema);

export default User;
