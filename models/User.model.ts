import mongoose, { Schema, Model, model } from 'mongoose';

import { IUser } from '../interfaces';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userFiles: [{ type: mongoose.Schema.Types.ObjectId, default: []}], 
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;