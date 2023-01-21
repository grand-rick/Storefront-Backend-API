import supertest from 'supertest';
import app from '../../server';
import { Product } from '../../models/product';
import orderToken from './1orders.spec';

const request = supertest(app);

describe("Testing the product model's route-handler functions", () => {
	it(`POST /products should add a new product`, async () => {
		const product: Product = {
			name: 'Labelled Hat',
			price: '350'
		}
		const response = await request
			.post('/products')
			.set('Authorization', `Bearer ${orderToken}`)
			.send(product);
		expect(response.status).toEqual(200);
	});

	it(`GET /products endpoint should show a list of all products`, async () => {
		const response = await request.get('/products');
		expect(response.status).toEqual(200);
	});

	it(`GET /products/:id should show a product with the id`, async () => {
		const response = await request.get('/products/2');
		expect(response.status).toEqual(200);
	});

	it(`DELETE /products/:id should remove the product with the specified id`, async () => {
		// Removing the first product created in order.spec.ts
		await request
			.delete('/products/1')
			.set('Authorization', `Bearer ${orderToken}`);

		const response = await request
			.delete('/products/2')
			.set('Authorization', `Bearer ${orderToken}`);
		expect(response.status).toEqual(200);
	});
});
