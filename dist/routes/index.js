"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./user.routes"));
const post_routes_1 = __importDefault(require("./post.routes"));
// import  roomRouter  from './room_route.js';
const router = (0, express_1.default)();
// router.use('/', roomRouter);
router.use('/users', user_routes_1.default);
router.use('/post', post_routes_1.default);
exports.default = router;
