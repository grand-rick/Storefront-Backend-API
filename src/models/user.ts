import db from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD as unknown as string;
const saltRounds = process.env.SALT_ROUNDS as unknown as string;

export type User = {
	id?: string | number;
	name: string;
    password: string;
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
            const sql = 'INSERT INTO users (name, hash_password) VALUES ($1, $2) RETURNING *';
            const hash = bcrypt.hashSync(
                `${u.password}${pepper}`,
                parseInt(saltRounds)
            );
            const conn = await db.connect();
            const result = await conn.query(sql, [u.name, hash]);
            conn.release();
            const newUser = result.rows[0];
            return newUser;
        } catch (err) {
            throw new Error(`Unable to create user. Error ${err}`);
        }
    }

    async update(u: User): Promise<User> {
        try {
            const sql = 'UPDATE users SET name = $2, hash_password = $3 WHERE id = $1';
            const hash = bcrypt.hashSync(
                `${u.password}${pepper}`,
                parseInt(saltRounds)
            );
            const conn = await db.connect();
            const result = await conn.query(sql, [u.name, hash]);
            conn.release();
            const updatedUser = result.rows[0];
            return updatedUser;
        } catch (err) {
            throw new Error(`Unable to create user. Error ${err}`);
        }
    }

    async show(id: string)Promise<User> {
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

    async delete(id: string)Promise<User> {
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
}
