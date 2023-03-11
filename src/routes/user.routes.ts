import express, { Router } from "express"
import { createUser, login } from "../controllers/Usercontroller"

const router: Router = express.Router();

router.post('/', createUser)
router.post('/login', login)

export default router;

