import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserInterface } from '../types/modelTypes';

const UserSchema = new Schema<UserInterface>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
}, { timestamps: true });

UserSchema.virtual('password');

UserSchema.pre('save', async function (done) {
  const hash = await bcrypt.hash(this.password, 8);
  this.passwordHash = hash;
  done();
});

export default model('User', UserSchema);
