import { Schema, model } from 'mongoose';

interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: string;
	isDeleted: boolean;
	avatar: string
}
const UserSchema = new Schema<User>(
	{
		firstName: {
			type: String,
			required: [true, 'first name is required'],
		},
		lastName: {
			type: String,
			required: [true, 'last name is required'],
		},
		avatar: String,
		email: {
			type: String,
			required: [true, 'email is required'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'password is required'],
		},
		role: {
			type: String,
			required: [true, 'role is required'],
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

export const UserModel = model<User>('user', UserSchema);
export { User }
