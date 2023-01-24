import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_DB,
	POSTGRES_TEST_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	ENV,
} = process.env;

console.log(ENV);

let db: Pool = new Pool();

if (ENV === 'test') {
	db = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_TEST_DB,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
		port: parseInt(POSTGRES_PORT as unknown as string)
	});
}

if (ENV === 'dev') {
	db = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_DB,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
		port: parseInt(POSTGRES_PORT as unknown as string)
	});
}

export default db;
