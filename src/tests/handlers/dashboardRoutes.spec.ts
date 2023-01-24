import supertest from 'supertest';
import app from '../../server';
import token from './1orders.spec';

const request = supertest(app);

describe('Testing the dashboard routes handler functions', () => {
	it('GET /products_in_orders should show all products in sorted by first order', async () => {
		const response = await request
			.get('/products_in_orders')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('GET /expensive_products should show top five expensive products', async () => {
		const response = await request
			.get('/expensive_products')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});

	it('GET /users_with_active_orders should show users with active orders', async () => {
		const response = await request
			.get('/users_with_active_orders')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});
});
