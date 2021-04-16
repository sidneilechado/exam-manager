import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';
import api from './routes';
import 'express-async-errors';
import AppError from './errors/AppError';

createConnection().then(async () => {
	console.log('Connected to Postgres DB...');
}).catch((error) => console.error(error));

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', api());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}

	console.error(err);

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000!');
});
