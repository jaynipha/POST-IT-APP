import express, { Router } from "express"
const router: Router = express.Router();
import { authenticate } from "../middlewares/authenticate";
import *  as User from "../controllers/Usercontroller"



router.post('/api/v1/create/users',User.createUser)