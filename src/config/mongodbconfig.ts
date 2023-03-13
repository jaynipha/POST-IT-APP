'use strict';
//import { mongoose } from  'mongoose';
import * as mongoose from 'mongoose';
import dotenv from 'dotenv';
//const MONGODB_URL = mongodb+srv://<ifenkili>:<Donscorp1711*>@cluster0.uzo1swk.mongodb.net/post-it?retryWrites=true&w=majority

dotenv.config();

const initDatabase = (mongoose:any) => {
	 mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Connected to mongoDb...'))
		.catch((err:any) => console.log(err.message));
};

export default initDatabase;
