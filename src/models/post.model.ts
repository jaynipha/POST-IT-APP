import { Schema, model, Types } from 'mongoose';

interface PostSchemaType {
	userId: Types.ObjectId;
	text: string;
	media: [{url: string, mediaType: string}];
	isDeleted: boolean;
}

const PostSchema = new Schema<PostSchemaType>(
	{
		userId: {
			type: Schema.Types.ObjectId,
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
	},
	{
		timestamps: true,
	}
);

export const Post = model<PostSchemaType>('Post', PostSchema);
export { PostSchemaType }
