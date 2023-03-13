import express, { Router } from "express"
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
    getUserSpecificPostComment } from "../controllers/Usercontroller"

const router: Router = express.Router();

router.get('/', getUsers)
router.post('/', createUser)
router.post('/login', login)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/:userId/posts', fetchAllUserSpecificPosts)
router.get('/:userId/posts/:postId', getUserSpecificPost)
router.get('/:userId/posts/:postId/comments', getUserSpecificPostComments)
router.get('/:userId/posts/:postId/comments/:id', getUserSpecificPostComment)

export default router;