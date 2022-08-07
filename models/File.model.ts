import mongoose, { Schema, Model, model } from 'mongoose';

import { IFile } from '../interfaces';

const fileSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  filePath: { type: String, required: true },
}, { timestamps: true });

const File: Model<IFile> = mongoose.models.File || model('File', fileSchema);

export default File;