import express, { Router } from "express";
import { createPost, createComment, getPostComments, getOnePostComment, editOnePostComment, deletePostWithId, deleteCommentWithId } from "../controllers/postcontroller";

const router: Router = express.Router();
import {authenticate} from "../middlewares/authenticate"


router.post('/',authenticate, createPost)
router.put('/:id',authenticate, deletePostWithId)
router.post('/:postId/comments',authenticate, createComment)
router.get('/:postId/comments',authenticate, getPostComments)
router.get('/:postId/comments/:id',authenticate, getOnePostComment)
router.put('/:postId/comments/:id',authenticate, editOnePostComment)
router.delete('/:postId/comments/:id/users/:userId',authenticate, deleteCommentWithId)
export default router;

