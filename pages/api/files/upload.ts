import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';

import { db } from '../../../database';
import { File, User } from '../../../models';
import { IFile } from '../../../interfaces/IFile';
import mongoose, { ObjectId } from 'mongoose';

type Data =
  | { message: string }

export const config = {
  api: {
    bodyParser: false,
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return uploadFiles(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const saveFile = async (file: formidable.File) => {
  const data = fs.readFileSync(file.filepath);

  const uniqueName = `${Date.now()}-_${file.originalFilename}`;

  fs.writeFileSync(`./public/uploads/${uniqueName}`, data);
  fs.unlinkSync(file.filepath);
  return uniqueName;
}

const parseFiles = async (req: NextApiRequest) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return reject(err);
      }

      const filePath = await saveFile(files.file as formidable.File);
      return resolve(filePath);
    });
  });
}

const uploadFiles = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const filePath = await parseFiles(req);
  const userId = req.cookies.userId;

  console.log(filePath);

  await db.connect();

  const file = new File({
    userId,
    filePath
  });

  const user = await User.findByIdAndUpdate(userId, { $push: { userFiles: (file._id as mongoose.Types.ObjectId) } });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    await file.save();
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

  res.status(200).json({ message: 'File uploaded successfully' });
}