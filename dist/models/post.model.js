"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
    },
    text: {
        type: String,
    },
    media: [{ url: String, mediaType: String }],
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});
exports.Post = (0, mongoose_1.model)('Post', PostSchema);
