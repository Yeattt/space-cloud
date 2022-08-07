import mongoose, { ObjectId } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  userFiles: mongoose.Types.ObjectId[];
}