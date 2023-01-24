import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken';
import orderToken from './1orders.spec';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET: string = process.env.TOKEN_SECRET;
const request = supertest(app);
let token: string;

const user: User = {
	first_name: 'John',
	last_name: 'Doe',
	username: 'Johnie',
	hash_password: 'Password123',
};

describe('Testing the user model\'s route-handler functions', () => {
	it('POST /users should add a new user', async () => {
		token = jwt.sign({ user }, TOKEN_SECRET);

		const response = await request
			.post('/users')
			.set('Authorization', `Bearer ${token}`)
			.send(user);
		expect(response.status).toEqual(200);
	});
	it('GET /users should return a list of all users', async () => {
		const response = await request
			.get('/users')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});
	it('GET /uses/:id should return a user with the id specified', async () => {
		const response = await request
			.get('/users/2')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});
	it('GET /auth should verify that a user exists', async () => {
		const user1 = {
			username: user.username,
			password: user.hash_password,
		};
		const response = await request
			.get('/auth')
			.set('Authorization', `Bearer ${token}`)
			.send(user1);
		expect(response.status).toEqual(200);
	});
	it('DELETE /users should delete a user', async () => {
		// Removing the first user created in orders.spec.ts
		await request
			.delete('/users/1')
			.set('Authorization', `Bearer ${orderToken}`);

		const response = await request
			.delete('/users/2')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});
	it('The endpoints have to be verified successfully before accessing them', async () => {
		const response = await request.get('/users');
		expect(response.status).toEqual(401);
	});
});
