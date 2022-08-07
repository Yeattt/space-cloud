import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('There is not a JWT secret seed in the global variables');
  }

  return jwt.sign({
    _id, email
  }, process.env.JWT_SECRET, { expiresIn: '15d' });
}

export const validateToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET) {
    throw new Error('There is not a JWT secret seed in the global variables');
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET || '', (err, payload) => {
        if (err) return reject('Invalid JWT');

        const { _id } = payload as { _id: string };

        resolve(_id);
      }); 
    } catch (error) {
      reject('Invalid JWT');
    }
  });
}