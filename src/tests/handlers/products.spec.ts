import supertest from 'supertest';
import app from '../../server';
import { Product } from '../../models/product';

const request = supertest(app);

describe("Testing the product model's handler functions", () => {
	it('Index method should return status 200', async () => {
		const response = await request.get('/products');
		expect(response.status).toEqual(200);
	});
});
