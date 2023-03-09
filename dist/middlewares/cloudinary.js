"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const config_1 = __importDefault(require("../config"));
const cloud = cloudinary_1.default.v2;
cloud.config({
    cloud_name: config_1.default.cloudName,
    api_key: config_1.default.cloudinaryApiKey,
    api_secret: config_1.default.cloudinarySecret,
    secure: true
});
exports.default = cloud;
