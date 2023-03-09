import { Response,Request } from "express";
import { omit } from "lodash";

import * as userService from "../services/user.service"

export  async function createUser (req: Request, res: Response)  {
  
    
  try {
    const newUser = await userService.createUser(req.body)
    return res.status(200).json(omit(newUser.toJSON(),["password","createdAt"]))

    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  
};

export async function updateUser(req: Request, res: Response) {
  
  try {
     await userService.updateUser({ _id: req.params }, req.body)
    return res.sendStatus(200)
  } catch (error) {
      return res.status(500).json({ success: false, message: error });

  }

}

