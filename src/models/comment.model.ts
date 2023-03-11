import { Schema, model, Types } from 'mongoose';

interface CommentSchemaType {
	userId: Types.ObjectId;
	postId: Types.ObjectId;
	text: string;
	media: [any];
	isDeleted: boolean;
}

const commentSchema = new Schema<CommentSchemaType>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: [true, 'User ID is required'],
		},
		postId: {
			type: Schema.Types.ObjectId,
			required: [true, 'Post ID is required'],
		},
		text: {
			type: String,
			required: [true, 'reply must be a valid ObjectId'],
		},
		media: {
			type: [],
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export const Comment = model<CommentSchemaType>('Comment', commentSchema);
export { CommentSchemaType }
