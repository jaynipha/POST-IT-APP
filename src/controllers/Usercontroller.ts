// import { Response,Request } from "express";
// import { omit } from "lodash";

// import * as userService from "../services/user.service"

// export  async function createUser (req: Request, res: Response)  {
  
    
//   try {
//     const newUser = await userService.createUser(req.body)
//     return res.status(200).json(omit(newUser.toJSON(),["password","createdAt"]))

//     } catch (error) {
//       return res.status(500).json({ success: false, message: error });
//     }
  
// };

// export async function updateUser(req: Request, res: Response) {
  
//   try {
//      await userService.updateUser({ _id: req.params }, req.body)
//     return res.sendStatus(200)
//   } catch (error) {
//       return res.status(500).json({ success: false, message: error });

//   }

// }
import { Response, Request, NextFunction } from "express";
import { createUserService, signIn } from "../services/user.service"

export async function createUser(req: Request, res: Response, next: NextFunction) {  
  try {
    const { data, token } = await createUserService(req.body);
    return res.status(201).send({ status: true, data, token });

  } catch (error) {
    next(error)
  }
};

export async function login(req: Request, res: Response, next: NextFunction) {  
  try {
    const { data, token } = await signIn(req.body);
    return res.status(200).send({ status: true, data, token });

  } catch (error) {
    next(error)
  }
};

// export async function updateUser(req: Request, res: Response) {

//   try {
//     await userService.updateUser({ _id: req.params }, req.body)
//     return res.sendStatus(200)
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error });

//   }

// }


