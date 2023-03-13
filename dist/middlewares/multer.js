"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
exports.default = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted\
        if (!file.mimetype.match(/png||jpeg||jpg||gif$i/)) {
            cb(new Error('File type is not supported'));
            return;
        }
        // To reject this file pass `false`, like so:
        // To accept the file pass `true`, like so:
        cb(null, true);
        // You can always pass an error if something goes wrong:
    }
});
