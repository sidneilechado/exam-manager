import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import exam from './exam';
import question from './question';
import swaggerDocument from './documentation/openapi.json';

export default function (): Router {
	const router = Router();

	router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

	router.use('/exam', exam());
	router.use('/question', question());

	return router;
}
