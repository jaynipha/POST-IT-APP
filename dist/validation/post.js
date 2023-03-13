"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = exports.createPostSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPostSchema = {
    userId: joi_1.default.string().trim().required(),
    Text: joi_1.default.string().trim().required(),
    //: Joi.number().required()
};
exports.postSchema = {
    name: joi_1.default.string().trim().required()
};
