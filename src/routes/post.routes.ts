import express, { Router } from "express";
import { createPost, createComment, getPostComments, getOnePostComment, editOnePostComment, deletePostWithId, deleteCommentWithId } from "../controllers/postcontroller";

const router: Router = express.Router();


router.post('/', createPost)
router.put('/:id', deletePostWithId)
router.post('/:postId/comments', createComment)
router.get('/:postId/comments', getPostComments)
router.get('/:postId/comments/:id', getOnePostComment)
router.put('/:postId/comments/:id', editOnePostComment)
router.delete('/:postId/comments/:id/users/:userId', deleteCommentWithId)
export default router;

