"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSpecificPostCommentService = exports.getUserPostCommentsService = exports.getUserSpecificPostService = exports.getAllUserPosts = exports.deleteUserService = exports.updateReplaceUserService = exports.getAllUsersService = exports.findByIdUserService = exports.signInService = exports.createUserService = void 0;
const post_model_1 = require("../models/post.model");
const comment_model_1 = require("../models/comment.model");
const utils_1 = require("../utils/utils");
const user_model_1 = require("../models/user.model");
const errorhandler_1 = require("../middlewares/errorhandler");
const toolbox_1 = require("../utils/toolbox");
async function createUserService(input) {
    const { firstName, lastName, email, password, role } = input;
    try {
        const checkExistingUser = await user_model_1.UserModel.findOne({ email });
        if (checkExistingUser !== null) {
            throw new errorhandler_1.AppError(400, "User Exist Already!!");
        }
        const hashedPassword = (0, toolbox_1.hashPassword)(password);
        const avatarUrl = await (0, utils_1.generateRandomAvatar)(email);
        const data = {
            email,
            lastName,
            firstName,
            avatar: avatarUrl,
            role: role || 'user',
            password: hashedPassword,
        };
        const newUser = await user_model_1.UserModel.create(data);
        await newUser.save();
        const token = (0, toolbox_1.createToken)({ role, email, id: newUser.id });
        return { data: newUser, token };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, "Something went wrong!!");
    }
}
exports.createUserService = createUserService;
const signInService = async ({ email, password }) => {
    try {
        const checkExistingUser = await user_model_1.UserModel.findOne({ email });
        if (!checkExistingUser) {
            throw new errorhandler_1.AppError(400, "Invalid Credentials!");
        }
        const checkPasswordValidity = (0, toolbox_1.comparePassword)(password, checkExistingUser.password);
        if (!checkPasswordValidity) {
            throw new errorhandler_1.AppError(400, "Invalid Credentials!");
        }
        const token = (0, toolbox_1.createToken)({ role: checkExistingUser.role, email, id: checkExistingUser.id });
        return { data: checkExistingUser, token };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, "Something went wrong!!");
    }
};
exports.signInService = signInService;
async function findByIdUserService(id) {
    try {
        const checkExistingUser = await user_model_1.UserModel.findOne({ _id: id });
        if (!checkExistingUser) {
            throw new errorhandler_1.AppError(400, "Invalid Credentials!");
        }
        return { data: checkExistingUser };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, "Something went wrong!!");
    }
}
exports.findByIdUserService = findByIdUserService;
async function getAllUsersService() {
    try {
        const data = await user_model_1.UserModel.find({ isDeleted: false });
        if (!data) {
            throw new errorhandler_1.AppError(400, "No user data in the DB!");
        }
        return { data };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, "Something went wrong!!");
    }
}
exports.getAllUsersService = getAllUsersService;
async function updateReplaceUserService(id, data) {
    try {
        const checkExistingUser = await user_model_1.UserModel.findOne({ _id: id });
        if (!checkExistingUser) {
            throw new errorhandler_1.AppError(400, "Invalid Credentials!");
        }
        const avatarUrl = await (0, utils_1.generateRandomAvatar)(checkExistingUser.email);
        const updateData = {
            email: data.email || checkExistingUser.email,
            lastName: data.lastName || checkExistingUser.lastName,
            firstName: data.firstName || checkExistingUser.firstName,
            avatar: avatarUrl,
        };
        await user_model_1.UserModel.findByIdAndUpdate(id, updateData);
        return { data: `User with id-${id} Updated Succesfully` };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, "Something went wrong!!");
    }
}
exports.updateReplaceUserService = updateReplaceUserService;
async function deleteUserService(id) {
    try {
        const checkExistingUser = await user_model_1.UserModel.findOne({ _id: id });
        if (!checkExistingUser) {
            throw new errorhandler_1.AppError(400, "Invalid Credentials!");
        }
        await user_model_1.UserModel.findByIdAndUpdate(id, { isDeleted: true });
        return { data: `Soft Deleted User with id-${id}` };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, "Something went wrong!!");
    }
}
exports.deleteUserService = deleteUserService;
async function getAllUserPosts(id) {
    try {
        //check if user exists
        const checkExistingUser = await user_model_1.UserModel.findOne({ _id: id });
        if (!checkExistingUser) {
            throw new errorhandler_1.AppError(400, "Invalid Credentials!");
        }
        //find all posts where user-id = id
        const userPosts = await post_model_1.Post.find({ userId: id });
        return { data: userPosts };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, "Something went wrong!!");
    }
}
exports.getAllUserPosts = getAllUserPosts;
async function getUserSpecificPostService(userId, postId) {
    try {
        //check if user exists
        const checkExistingUser = await user_model_1.UserModel.findOne({ _id: userId });
        if (!checkExistingUser) {
            throw new errorhandler_1.AppError(400, "Invalid Credentials!");
        }
        //find post where user-id = userId and _id = postId
        const specificPost = await post_model_1.Post.findOne({ userId, _id: postId });
        return { data: specificPost };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, "Something went wrong!!");
    }
}
exports.getUserSpecificPostService = getUserSpecificPostService;
async function getUserPostCommentsService(userId, postId) {
    try {
        //check if user exists
        const checkExistingUser = await user_model_1.UserModel.findOne({ _id: userId });
        if (!checkExistingUser) {
            throw new errorhandler_1.AppError(400, "Invalid Credentials!");
        }
        //find post where user-id = userId and _id = postId
        const checkExistingPost = await post_model_1.Post.findOne({ _id: postId });
        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new errorhandler_1.AppError(400, "Post Not Available");
        }
        const getUserPostComments = await comment_model_1.Comment.find({ postId });
        return { data: getUserPostComments };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, error);
    }
}
exports.getUserPostCommentsService = getUserPostCommentsService;
async function getUserSpecificPostCommentService(userId, postId, id) {
    try {
        //check if user exists
        const checkExistingUser = await user_model_1.UserModel.findOne({ _id: userId });
        if (!checkExistingUser) {
            throw new errorhandler_1.AppError(400, "Invalid Credentials!");
        }
        //find post where user-id = userId and _id = postId
        const checkExistingPost = await post_model_1.Post.findOne({ _id: postId });
        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new errorhandler_1.AppError(400, "Post Not Available");
        }
        const getUserPostComment = await comment_model_1.Comment.findOne({ postId, userId, _id: id });
        return { data: getUserPostComment };
    }
    catch (error) {
        throw new errorhandler_1.AppError(500, error);
    }
}
exports.getUserSpecificPostCommentService = getUserSpecificPostCommentService;
