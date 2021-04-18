import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import exam from './exam';
import swaggerDocument from './documentation/openapi.json';

export default function (): Router {
	const router = Router();

	router.use('/exam', exam());
	router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

	return router;
}
