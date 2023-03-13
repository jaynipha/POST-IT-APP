import { Schema, model, Types } from 'mongoose';

interface PostSchemaType {
	userId: Types.ObjectId;
	text: string;
	media: [{url: string, mediaType: string}];
	isDeleted: boolean;
	comments:[Types.ObjectId]
}

const PostSchema = new Schema<PostSchemaType>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: [true, 'User ID is required'],
			ref:"user"
		},
		text: {
			type: String,
		},
     comments:[{type:Schema.Types.ObjectId,ref:"comment" }],
		media: [{ url: String, mediaType: String }],
		isDeleted: {
			type: Boolean,
			default: false,
		},
	
	},
	{
		timestamps: true,
	}
);

export const Post = model<PostSchemaType>('Post', PostSchema);
export { PostSchemaType }
