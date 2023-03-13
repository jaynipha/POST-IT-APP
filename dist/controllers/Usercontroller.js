"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSpecificPostComment = exports.getUserSpecificPostComments = exports.getUserSpecificPost = exports.fetchAllUserSpecificPosts = exports.deleteUser = exports.updateUser = exports.getUsers = exports.getUserById = exports.login = exports.createUser = void 0;
const user_service_1 = require("../services/user.service");
async function createUser(req, res, next) {
    try {
        const { data, token } = await (0, user_service_1.createUserService)(req.body);
        return res.status(201).send({ status: true, data, token });
    }
    catch (error) {
        next(error);
    }
}
exports.createUser = createUser;
;
async function login(req, res, next) {
    try {
        const { data, token } = await (0, user_service_1.signInService)(req.body);
        return res.status(200).send({ status: true, data, token });
    }
    catch (error) {
        next(error);
    }
}
exports.login = login;
;
async function getUserById(req, res, next) {
    try {
        const userId = req.params.id;
        const { data } = await (0, user_service_1.findByIdUserService)(userId);
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.getUserById = getUserById;
;
async function getUsers(req, res, next) {
    try {
        const { data } = await (0, user_service_1.getAllUsersService)();
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.getUsers = getUsers;
;
async function updateUser(req, res, next) {
    try {
        const { data } = await (0, user_service_1.updateReplaceUserService)(req.params.id, req.body);
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.updateUser = updateUser;
;
async function deleteUser(req, res, next) {
    try {
        const { data } = await (0, user_service_1.deleteUserService)(req.params.id);
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.deleteUser = deleteUser;
;
async function fetchAllUserSpecificPosts(req, res, next) {
    try {
        const { data } = await (0, user_service_1.getAllUserPosts)(req.params.userId);
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.fetchAllUserSpecificPosts = fetchAllUserSpecificPosts;
;
async function getUserSpecificPost(req, res, next) {
    try {
        const { data } = await (0, user_service_1.getUserSpecificPostService)(req.params.userId, req.params.postId);
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.getUserSpecificPost = getUserSpecificPost;
;
async function getUserSpecificPostComments(req, res, next) {
    try {
        const { data } = await (0, user_service_1.getUserPostCommentsService)(req.params.userId, req.params.postId);
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.getUserSpecificPostComments = getUserSpecificPostComments;
;
async function getUserSpecificPostComment(req, res, next) {
    try {
        const { data } = await (0, user_service_1.getUserSpecificPostCommentService)(req.params.userId, req.params.postId, req.params.id);
        return res.status(200).send({ status: true, data });
    }
    catch (error) {
        next(error);
    }
}
exports.getUserSpecificPostComment = getUserSpecificPostComment;
;
