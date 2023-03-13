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

const avatarStyles = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'avataaars-neutral',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'bottts',
  'bottts-neutral',
  'croodles',
  'croodles-neutral',
  'fun-emoji',
  'icons',
  'identicon',
  'initials',
  'lorelei',
  'lorelei-neutral',
  'micah',
  'miniavs',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral',
  'shapes',
  'thumbs'
 ];
 
const getRandomAvatarStyle = (avatarStyles: string[]) => {
  const randomIndex = Math.floor(Math.random() * avatarStyles.length);
  return avatarStyles[randomIndex];
 }
 
export const generateRandomAvatar = async (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const _email = email.replace(/\s+/g, '');

  const isValidEmail = emailRegex.test(_email);
  if (!isValidEmail) {
    throw new Error('Invalid email')
  }
 
 
  const entropySource = () => Math.random().toString(36).substring(2,7);
 
 
  const replaceAt = `-${entropySource()}-`
  const replaceDot = `-${entropySource()}-`
 
 
  const seed = _email.replace('@', replaceAt).split('.').join(replaceDot);
 
 
  const randomAvatarStyle = getRandomAvatarStyle(avatarStyles);
 
 
  if (!randomAvatarStyle || !avatarStyles.includes(randomAvatarStyle)) {
    // console.error('Invalid avatar style') // log this error to the console
    throw new Error('Something failed: ')
  }
 
 
  const avatarUrl = `https://api.dicebear.com/5.x/${randomAvatarStyle}/svg?seed=${seed}&size=200&radius=50`;
 
 
  return avatarUrl;
 
 
 }
 