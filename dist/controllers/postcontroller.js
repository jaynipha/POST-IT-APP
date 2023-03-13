"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentWithId = exports.deletePostWithId = exports.editOnePostComment = exports.getOnePostComment = exports.getPostComments = exports.createComment = exports.createPost = void 0;
const post_service_1 = require("../services/post.service");
async function createPost(req, res, next) {
    try {
        const { data } = await (0, post_service_1.createPostService)(req.body);
        return res.status(201).send({ status: true, data });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}
exports.createPost = createPost;
async function createComment(req, res, next) {
    try {
        const { data } = await (0, post_service_1.createCommentService)(req.params.postId, req.body);
        return res.status(201).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.createComment = createComment;
;
async function getPostComments(req, res, next) {
    try {
        const { data } = await (0, post_service_1.getPostCommentService)(req.params.postId);
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.getPostComments = getPostComments;
async function getOnePostComment(req, res, next) {
    try {
        const { data } = await (0, post_service_1.getOnePostCommentService)(req.params.postId, req.params.id);
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.getOnePostComment = getOnePostComment;
async function editOnePostComment(req, res, next) {
    try {
        const { data } = await (0, post_service_1.editOnePostCommentService)(req.params.postId, req.params.id, req.body);
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.editOnePostComment = editOnePostComment;
async function deletePostWithId(req, res, next) {
    try {
        const { data } = await (0, post_service_1.deletePostWithIdService)(req.params.id, req.params.id);
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.deletePostWithId = deletePostWithId;
async function deleteCommentWithId(req, res, next) {
    try {
        const { data } = await (0, post_service_1.deleteCommentWithIdService)(req.params.postId, req.params.id, req.params.userId);
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.deleteCommentWithId = deleteCommentWithId;
