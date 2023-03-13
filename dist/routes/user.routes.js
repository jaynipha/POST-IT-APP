"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Usercontroller_1 = require("../controllers/Usercontroller");
const router = express_1.default.Router();
router.get('/', Usercontroller_1.getUsers);
router.post('/', Usercontroller_1.createUser);
router.post('/login', Usercontroller_1.login);
router.get('/:id', Usercontroller_1.getUserById);
router.put('/:id', Usercontroller_1.updateUser);
router.delete('/:id', Usercontroller_1.deleteUser);
router.get('/:userId/posts', Usercontroller_1.fetchAllUserSpecificPosts);
router.get('/:userId/posts/:postId', Usercontroller_1.getUserSpecificPost);
router.get('/:userId/posts/:postId/comments', Usercontroller_1.getUserSpecificPostComments);
router.get('/:userId/posts/:postId/comments/:id', Usercontroller_1.getUserSpecificPostComment);
exports.default = router;
