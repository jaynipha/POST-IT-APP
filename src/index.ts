
import helmet from 'helmet';
import express, { Application } from 'express';
import mongoose from 'mongoose';


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());



app.listen(3000, () =>
	console.log(`listening on port: 3000`)
);





//import routes from './api/routes/index';
import initDatabase from './config/mongodbconfig';
//import { mongoose } from 'mongoose';


initDatabase(mongoose);





//app.use('/api/v1', routes);




