
import helmet from 'helmet';
import express, { Application } from 'express';


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());






app.listen(3000, () =>
	console.log(`listening on port: 3000`)
);
