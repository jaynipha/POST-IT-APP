import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { Request } from "express";


export  async function hashPassword(password:string) {
  return await bcrypt.hashSync(password, 10);
}



export async function compare(password:string, hash:string){
  return await bcrypt.compareSync(password, hash);
}

export const  createToken = (payload:object, expiresIn :string,secret:any) => {
  return jwt.sign(payload, secret, { expiresIn });
}

export const checkToken = (req:Request) => {
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

export const verifyToken = (token:string,secret:any) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    throw new Error('Invalid Token');
  }
}
