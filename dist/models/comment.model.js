"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Post ID is required'],
    },
    text: {
        type: String,
        required: [true, 'roomType must be a valid ObjectId'],
    },
    media: {
        type: [],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Comment = (0, mongoose_1.model)('Comment', commentSchema);
