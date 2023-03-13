"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentWithIdService = exports.deletePostWithIdService = exports.editOnePostCommentService = exports.getOnePostCommentService = exports.getPostCommentService = exports.createCommentService = exports.createPostService = void 0;
const errorhandler_1 = require("../middlewares/errorhandler");
const post_model_1 = require("../models/post.model");
const comment_model_1 = require("../models/comment.model");
async function createPostService(input) {
    try {
        const newPost = await post_model_1.Post.create(input);
        await newPost.save();
        return { data: newPost };
    }
    catch (error) {
        console.log(error.message);
        throw new errorhandler_1.AppError(500, error);
    }
}
exports.createPostService = createPostService;
async function createCommentService(postId, { text, userId }) {
    try {
        const data = {
            postId, text, userId
        };
        const checkExistingPost = await post_model_1.Post.findOne({ _id: postId });
        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new errorhandler_1.AppError(400, "Post Not Available");
        }
        const newComment = await comment_model_1.Comment.create(data);
        const dataId = await newComment.save();
        await post_model_1.Post.findByIdAndUpdate(postId, { $push: { comments: dataId._id } });
        return { data: newComment };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, error);
    }
}
exports.createCommentService = createCommentService;
async function getPostCommentService(postId) {
    try {
        const checkExistingPost = await post_model_1.Post.findOne({ _id: postId });
        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new errorhandler_1.AppError(400, "Post Not Available");
        }
        const getPostComments = await comment_model_1.Comment.find({ postId });
        return { data: getPostComments };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, error);
    }
}
exports.getPostCommentService = getPostCommentService;
async function getOnePostCommentService(postId, id) {
    try {
        const checkExistingPost = await post_model_1.Post.findOne({ _id: postId });
        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new errorhandler_1.AppError(400, "Post Not Available");
        }
        const getPostComment = await comment_model_1.Comment.findOne({ _id: id });
        if (!getPostComment || getPostComment.isDeleted !== false) {
            throw new errorhandler_1.AppError(400, "Post Not Available");
        }
        return { data: getPostComment };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, error);
    }
}
exports.getOnePostCommentService = getOnePostCommentService;
async function editOnePostCommentService(postId, commentId, data) {
    try {
        //first, check if post exist and throw error if not available
        const checkExistingPost = await post_model_1.Post.findOne({ _id: postId });
        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new errorhandler_1.AppError(400, "Post Not Available");
        }
        //check if comment exist and throw error if not available
        const getPostComment = await comment_model_1.Comment.findOne({ _id: commentId, userId: data.userId });
        if (!getPostComment || getPostComment.isDeleted !== false) {
            throw new errorhandler_1.AppError(400, "Comment Not Available");
        }
        //check if the post belongs to the user
        if (getPostComment.userId.toString() !== data.userId) {
            throw new errorhandler_1.AppError(400, "Can't edit comment");
        }
        //update comment with ID
        await comment_model_1.Comment.findByIdAndUpdate(commentId, data);
        return { data: `Comment with id-${commentId} have been updated` };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, error);
    }
}
exports.editOnePostCommentService = editOnePostCommentService;
async function deletePostWithIdService(postId, id) {
    try {
        //first, check if post exists and throw error if not available
        const checkExistingPost = await post_model_1.Post.findOne({ _id: postId });
        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new errorhandler_1.AppError(400, "Post Not Available");
        }
        //SOFT DELETE - update is deleted to true.
        await post_model_1.Post.findByIdAndUpdate(id, { isDeleted: true });
        //bulk update all comments to deleted since the original post have been deleted.
        // const updateOperation = {
        //     $set: { isDeleted: true }
        // };
        // const filter = { postId };
        // await Comment.updateMany(filter, updateOperation);
        return { data: `Post with id-${id} have been soft-deleted` };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, error);
    }
}
exports.deletePostWithIdService = deletePostWithIdService;
async function deleteCommentWithIdService(postId, id, userId) {
    try {
        //first, check if post exists and throw error if not available
        const checkExistingPost = await post_model_1.Post.findOne({ _id: postId });
        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new errorhandler_1.AppError(400, "Post Not Available");
        }
        //check if comment exist and throw error if not available
        const getPostComment = await comment_model_1.Comment.findOne({ _id: id, userId: userId });
        if (!getPostComment || getPostComment.isDeleted !== false) {
            throw new errorhandler_1.AppError(400, "Comment Not Available");
        }
        //  if (getPostComment.userId.toString() !== data.userId as unknown as string) {
        //       throw new AppError(400, "Can't edit comment")
        //   }
        //SOFT DELETE - update is deleted to true.
        await comment_model_1.Comment.findByIdAndUpdate(id, { isDeleted: true });
        await post_model_1.Post.findByIdAndUpdate(postId, { $pull: { comments: id } });
        return { data: `comment with id-${id} have been soft-deleted` };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, error);
    }
}
exports.deleteCommentWithIdService = deleteCommentWithIdService;
