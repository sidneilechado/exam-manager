import { createConnection } from 'typeorm';

createConnection().then(async () => {
	console.log('Connected to Postgres');
}).catch((error) => console.log(error));
