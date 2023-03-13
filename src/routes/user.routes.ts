import express, { Router } from "express"
import { authenticate } from "../middlewares/authenticate";
import { 

    createUser, 
    login, 
    getUserById, 
    getUsers, 
    updateUser, 
    fetchAllUserSpecificPosts, 
    getUserSpecificPost,
    deleteUser, 
    getUserSpecificPostComments, 
  getUserSpecificPostComment
} from "../controllers/Usercontroller"
    

import { validationMiddleware } from "../middlewares/validate"
import  {signupSchema,signinSchema} from "../schema/user.schema"

const router: Router = express.Router();


router.get('/', authenticate, getUsers)
router.post('/',validationMiddleware(signupSchema), createUser)
router.post('/login',validationMiddleware(signinSchema), login)
router.get('/:id',authenticate, getUserById)
router.put('/:id',authenticate, updateUser)
router.delete('/:id',authenticate, deleteUser)
router.get('/:userId/posts',authenticate, fetchAllUserSpecificPosts)
router.get('/:userId/posts/:postId',authenticate, getUserSpecificPost)
router.get('/:userId/posts/:postId/comments',authenticate, getUserSpecificPostComments)
router.get('/:userId/posts/:postId/comments/:id',authenticate, getUserSpecificPostComment)

export default router;