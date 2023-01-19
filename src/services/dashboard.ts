import db from '../database';

export default class DashboardQueries {
	// Get all products that have been included in orders
	async productsInOrders(): Promise<
		{ name: string; price: number; order_id: string }[]
	> {
		try {
			const conn = await db.connect();
			const sql =
				'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id ORDER BY order_id';

			const result = await conn.query(sql);

			conn.release();

			return result.rows;
		} catch (err) {
			throw new Error(`unable get products and orders: ${err}`);
		}
	}

    // It returns the top five most expensive products in the database
    async topFiveExpensiveProducts(): Promise<
		{ name: string; price: number;}[]
	> {
		try {
			const conn = await db.connect();
			const sql =
				'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';

			const result = await conn.query(sql);

			conn.release();

			return result.rows;
		} catch (err) {
			throw new Error(`unable get top five expensive products: ${err}`);
		}
	}

    // We're getting all the users who have completed orders
    async usersWithActiveOrders(): Promise<
		{ username: string; order_id: string }[]
	> {
		try {
			const conn = await db.connect();
			const sql =
				'SELECT username, order_id FROM users INNER JOIN orders ON users.id = orders.user_id INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.status = $1';
            const statusOfOrder = 'active';
			const result = await conn.query(sql, [statusOfOrder]);

			conn.release();

			return result.rows;
		} catch (err) {
			throw new Error(`unable get users with active orders: ${err}`);
		}
	}
}
