import { ObjectId } from 'mongoose';

export interface IFile {
  userId: ObjectId;
  filePath: string;
}