import { Router } from 'express';
import {
	createExam,
	modifyExam,
	retrieveExam,
	deleteExam,
} from './useCases';

export default function (): Router {
	const router = Router();

	router.get('/:id', retrieveExam);
	router.post('/create', createExam);
	router.put('/modify/:id', modifyExam);
	router.delete('/:id', deleteExam);

	return router;
}
