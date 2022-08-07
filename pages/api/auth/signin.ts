import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { jwt } from '../../../utils';
import { User } from '../../../models';

type Data =
  | { message: string }
  | { token: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return signin(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const signin = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, password } = req.body;

  await db.connect();

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Incorrect credentials' });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: 'Incorrect credentials' });
  }

  const { _id } = user;

  const token = jwt.signToken(JSON.stringify(_id), email);

  res.status(200).json({
    message: 'User logged successfully',
    token
  });

  try {
  } catch (error) {
    db.disconnect();
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}