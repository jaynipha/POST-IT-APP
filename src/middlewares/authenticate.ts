// import { checkToken, verifyToken } from '../utils/toolbox'
// import { Request,Response,NextFunction } from 'express';
// import config from '../config';



// const secret  = config.sessionSecet
// export async function authenticate (req:Request, res:Response, next:NextFunction)  {
//     try {
//         const token = checkToken(req);

//         if (!token) return res.status(401).send({ status: false, message: 'Access denied, Token required' });
//         const decodedToken = verifyToken(token,secret);

//         res.locals.user = decodedToken;
//         return next();
//     } catch (error:any) {
//         return res.status(404).send({ status: false, message: error.message });
//     }
// }

