import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

export interface User extends mongoose.Document {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
