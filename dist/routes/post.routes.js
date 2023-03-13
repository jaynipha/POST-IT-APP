"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postcontroller_1 = require("../controllers/postcontroller");
const router = express_1.default.Router();
router.post('/', postcontroller_1.createPost);
router.put('/:id', postcontroller_1.deletePostWithId);
router.post('/:postId/comments', postcontroller_1.createComment);
router.get('/:postId/comments', postcontroller_1.getPostComments);
router.get('/:postId/comments/:id', postcontroller_1.getOnePostComment);
router.put('/:postId/comments/:id', postcontroller_1.editOnePostComment);
router.delete('/:postId/comments/:id/users/:userId', postcontroller_1.deleteCommentWithId);
exports.default = router;
