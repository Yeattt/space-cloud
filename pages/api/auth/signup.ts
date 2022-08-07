import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { jwt } from '../../../utils';
import { db } from '../../../database';
import { User } from '../../../models';

type Data =
  | { message: string }
  | { message: string }
  | { token: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return signup(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const signup = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, password } = req.body;

  await db.connect();

  const existUser = await User.findOne({ email });

  if (existUser) {
    return res.status(400).json({ message: 'The email is already in use' });
  }

  if (password.length < 3) {
    return res.status(400).json({ message: 'The password must be longer than 3 characters' });
  }

  const user = new User({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, 10)
  });

  try {
    await user.save();
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

  const { _id } = user;

  const token = jwt.signToken(JSON.stringify(_id), email);

  db.disconnect();

  res.status(200).json({
    message: 'User created successfully',
    token
  });
}