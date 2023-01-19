import db from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
	id?: string | number;
	first_name: string;
	last_name: string;
	username: string;
	hash_password: string;
};

export default class UserStore {
	async index(): Promise<User[]> {
		try {
			const sql = 'SELECT * FROM users';
			const conn = await db.connect();
			const result = await conn.query(sql);
			conn.release();
			const users = result.rows;
			return users;
		} catch (err) {
			throw new Error(`Unable to show all users. Error ${err}`);
		}
	}

	async create(u: User): Promise<User> {
		try {
			const sql =
				'INSERT INTO users (first_name, last_name, username, hash_password) VALUES ($1, $2, $3, $4) RETURNING *';
			const hash = bcrypt.hashSync(
				`${u.hash_password}${pepper}`,
				parseInt(saltRounds)
			);
			const conn = await db.connect();
			const result = await conn.query(sql, [
				u.first_name,
				u.last_name,
				u.username,
				hash,
			]);
			conn.release();
			const newUser = result.rows[0];
			return newUser;
		} catch (err) {
			throw new Error(`Unable to create user. Error ${err}`);
		}
	}

	async show(id: string): Promise<User> {
		try {
			const sql = 'SELECT * FROM users WHERE id = $1';
			const conn = await db.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			const user = result.rows[0];
			return user;
		} catch (err) {
			throw new Error(`Unable to show user. Error ${err}`);
		}
	}

	async delete(id: string): Promise<User> {
		try {
			const sql = 'DELETE FROM users WHERE id = $1';
			const conn = await db.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			const deleted = result.rows[0];
			return deleted;
		} catch (err) {
			throw new Error(`Unable to delete user. Error ${err}`);
		}
	}

	async authenticate(username: string, password: string): Promise<User | null> {
		const sql = 'SELECT * FROM users WHERE username = $1';

		try {
			const conn = await db.connect();
			const result = await conn.query(sql, [username]);
			conn.release();
			if (result.rows.length) {
				const user = result.rows[0];
				const isPasswordValid = bcrypt.compareSync(
					`${password}${pepper}`,
					user.hash_password
				);
				if (isPasswordValid) {
					return user;
				}
			}
			return null;
		} catch (err) {
			throw new Error(`Unable to authenticate. Error ${err}`);
		}
	}
}
