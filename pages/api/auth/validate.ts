import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

type Data =
  | { message: string }
  | {
    token: string,
    user: { email: string }
  }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return validateToken(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const validateToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token = '' } = req.cookies;

  let userId = '';

  try {
    const idFromToken = await jwt.validateToken(token);
    userId = JSON.parse(idFromToken);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  await db.connect();
  const userDB = await User.findById(userId).lean();
  await db.disconnect();

  if (!userDB) {
    return res.status(400).json({ message: 'User not found' });
  }

  const { _id, email } = userDB;

  const newToken = jwt.signToken(JSON.stringify(_id), email);

  res.status(200).json({
    token: newToken,
    user: { email }
  });
}