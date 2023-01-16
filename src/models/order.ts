import db from '../database';

export type Order = {
	id?: string | number;
	status: string;
	productQuantity: string;
	productId: string;
	userId: string;
};

export default class OrderStore {
	async index(): Promise<Order[]> {
		try {
			const sql = 'SELECT * FROM orders';
			const conn = await db.connect();
			const result = await conn.query(sql);
			conn.release();
			const users = result.rows;
			return users;
		} catch (err) {
			throw new Error(`Unable to show all orders. Error ${err}`);
		}
	}

	async create(u: Order): Promise<Order> {
		try {
			const sql =
				'INSERT INTO orders (status, product_quantity, product_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *';
			const conn = await db.connect();
			const result = await conn.query(sql, [
				u.status,
				u.productQuantity,
				u.productId,
				u.userId,
			]);
			conn.release();
			const newOrder = result.rows[0];
			return newOrder;
		} catch (err) {
			throw new Error(`Unable to add order. Error ${err}`);
		}
	}

	async show(id: string): Promise<Order> {
		try {
			const sql = 'SELECT * FROM orders WHERE id = $1';
			const conn = await db.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			const order = result.rows[0];
			return order;
		} catch (err) {
			throw new Error(`Unable to show order. Error ${err}`);
		}
	}
}
