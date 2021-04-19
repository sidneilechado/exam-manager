import { Router } from 'express';

import {
	createQuestion,
	retrieveQuestion,
	modifyQuestion,
	deleteQuestion,
	insertSingleOption,
	deleteSingleOption,
} from './useCases';

export default function (): Router {
	const router = Router();

	router.get('/:id', retrieveQuestion);
	router.post('/create', createQuestion);
	router.put('/modify/:id', modifyQuestion);
	router.delete('/delete/:id', deleteQuestion);

	router.post('/option/:id', insertSingleOption);
	router.delete('/:id/:key', deleteSingleOption);

	return router;
}
