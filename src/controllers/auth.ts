import { UserModel } from '../models/user.model';
import { hashPassword, createToken, compare } from '../utils/utils'
import { Response,Request, } from 'express';
import dotenv from "dotenv"
import * as userService from "../services/user.service"
import config from '../config';


const secret =  config.sessionSecet




export const signIn = async (req:Request, res:Response) => {
    const { email, password } = req.body;

    try {
        const checkExistingUser = await userService.findUser({email});

        if (!checkExistingUser) {
            return res.status(400).json({
                status: false,
                message: "Invalid Credentials!",
            })
        }

        const checkPasswordValidity = compare(password, checkExistingUser!.password);

        if (!checkPasswordValidity) {
            return res.status(400).json({
                status: false,
                message: "Invalid Credentials!",
            })
        }

        const token = createToken({ role: checkExistingUser!.role, email, id: checkExistingUser!.id },"1d",secret);
        return res.status(200).send({ status: true,  token })

    } catch (error:any) {
        return res.status(404).json(error.message);
    }
}


