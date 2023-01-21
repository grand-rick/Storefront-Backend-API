import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { Product } from '../../models/product';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET: string = process.env.TOKEN_SECRET;
const request = supertest(app);

const user: User = {
	first_name: 'John',
	last_name: 'Doe',
	username: 'Johnie',
	hash_password: 'Password123',
};

const product: Product = {
    name: 'Bed',
    price: '500',
};
const order: Order = {
    status: 'active',
    product_quantity: '20',
    product_id: '1',
    user_id: '1'
};

const orderToken = jwt.sign({ user }, TOKEN_SECRET);


describe("Testing the order model's route-handler functions", () => {
	it(`POST /order should add a new order`, async () => {
        const createUserResponse = await request
			.post('/users')
			.set('Authorization', `Bearer ${orderToken}`)
			.send(user);

        const createProductResponse = await request
			.post('/products')
			.set('Authorization', `Bearer ${orderToken}`)
			.send(product);

		const response = await request
			.post('/orders')
			.set('Authorization', `Bearer ${orderToken}`)
			.send(order);
		expect(response.status).toEqual(200);
	});

	it(`GET /orders should show a list of all orders`, async () => {
		const response = await request.get('/orders');
		expect(response.status).toEqual(200);
	});

	it(`GET /orders/:id should show an order with the id`, async () => {
		const response = await request.get('/orders/1');
		expect(response.status).toEqual(200);
	});

	it(`DELETE /orders/:id should remove the order with the specified id`, async () => {
		const response = await request
			.delete('/orders/1')
			.set('Authorization', `Bearer ${orderToken}`);
		expect(response.status).toEqual(200);
	});
});

export default orderToken;