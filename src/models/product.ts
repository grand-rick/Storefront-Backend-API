import db from '../database';

export type Product = {
	id?: string | number;
	name: string;
	price: string;
};

export default class ProductStore {
	async index(): Promise<Product[]> {
		try {
			const sql = 'SELECT * FROM products';
			const conn = await db.connect();
			const result = await conn.query(sql);
			conn.release();
			const users = result.rows;
			return users;
		} catch (err) {
			throw new Error(`Unable to show all products. Error ${err}`);
		}
	}

	async create(u: Product): Promise<Product> {
		try {
			const sql =
				'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
			const conn = await db.connect();
			const result = await conn.query(sql, [u.name, u.price]);
			conn.release();
			const newProduct = result.rows[0];
			return newProduct;
		} catch (err) {
			throw new Error(`Unable to add product. Error ${err}`);
		}
	}

	async show(id: string): Promise<Product> {
		try {
			const sql = 'SELECT * FROM products WHERE id = $1';
			const conn = await db.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			const product = result.rows[0];
			return product;
		} catch (err) {
			throw new Error(`Unable to show product. Error ${err}`);
		}
	}

	async delete(id: string): Promise<Product> {
		try {
			const sql = 'DELETE FROM products WHERE id = $1';
			const conn = await db.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			const deleted = result.rows[0];
			return deleted;
		} catch (err) {
			throw new Error(`Unable to delete product. Error ${err}`);
		}
	}
}
