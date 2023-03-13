import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from "dotenv"


dotenv.config()

import { Request } from 'express';

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const createToken = (payload: object, expiresIn = '1d') => {
  return jwt.sign(payload, process.env.SESSION_SECRET as string, { expiresIn });
}


export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
}


export const checkToken = (req: Request) => {
  const {
    headers: { authorization },
  } = req;


  let bearerToken = null;
  if (authorization === undefined) throw new Error('no auth');


  if (authorization) {
    bearerToken = authorization.split(' ')[1]
      ? authorization.split(' ')[1]
      : authorization;
  }

  return (
    bearerToken
    || req.headers['x-access-token']
    || req.headers.token
    || req.body.token
  );
}


export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET as string);
    return decoded;
  } catch (err) {
    throw new Error('Invalid Token');
  }
}
