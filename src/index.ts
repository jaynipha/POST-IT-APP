
import http from 'http';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction, Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

import routes from './routes';
import { AppError } from './middlewares/errorhandler';
dotenv.config()

const app: Application = express();
const server = http.createServer(app);

mongoose
	.connect(process.env.MONGODB_URL as string, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: true,
	} as ConnectOptions)
	.then(() => {
		console.log("Database Connected Successfully.");
	})
	.catch((err) => {
		console.log("Error Connectiong to the Database", err);
	});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.get('/', (request: Request,
	response: Response,) => response.redirect("https://documenter.getpostman.com/view/21748378/2s93Jut37z"))

const production = process.env.NODE_ENV === 'production';

if (!production) {
	app.use((error: AppError,
		request: Request,
		response: Response,
		next: NextFunction) => {

		response.status(error.statusCode || 500);
		response.json({
			status: false,
			errors: {
				message: error.message,
				errorStatusCode: error.statusCode,
				errorStackTrace: error?.stack,
			},
		});
	});
}



server.listen(process.env.PORT || 3000, () =>
	console.log(`POST-API is running on http://localhost:${process.env.PORT}`)
);
