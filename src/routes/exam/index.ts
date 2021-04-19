import { Router } from 'express';
import {
	createExam,
	modifyExam,
	retrieveExam,
	deleteExam,
	addQuestionToExam,
	deleteQuestionFromExam,
} from './useCases';

export default function (): Router {
	const router = Router();

	router.get('/:id', retrieveExam);
	router.post('/create', createExam);
	router.put('/modify/:id', modifyExam);
	router.delete('/delete/:id', deleteExam);

	router.post('/:examId/:questionId', addQuestionToExam);
	router.delete('/:examId/:questionId', deleteQuestionFromExam);

	return router;
}
