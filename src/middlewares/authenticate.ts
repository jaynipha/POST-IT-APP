import { Response, Request, NextFunction } from 'express';
import { checkToken, verifyToken } from '../utils/toolbox'

interface DecodedToken {
    role: string; email: string, id: string
  }
  
  declare global {
    namespace Express {
      interface Request {
        user?: DecodedToken; // Add the custom property to the Request interface
      }
    }
  }


export const authenticate = (req: any, res: Response, next: NextFunction) => {
    try {
        const token = checkToken(req);

        if (!token) return res.status(401).send({ status: false, message: 'Access denied, Token required' });
        const decodedToken = verifyToken(token);

        req.user = decodedToken;
        next();
    } catch (error: any) {
        return res.status(404).send({ status: false, message: error.message });
    }
}

export const checkIfIsAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(req.user?.id !== 'admin'){
        return res.status(401).send({ status: false, message: 'Access denied, Admin Access Only !!!' });
    }
    next()
}