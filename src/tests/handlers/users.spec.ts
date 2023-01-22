import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET: string = process.env.TOKEN_SECRET;
const request = supertest(app);
let token: string;

const user1: User = {
	first_name: 'John',
	last_name: 'Doe',
	username: 'Johnie',
	hash_password: 'Password123',
};

describe("Testing the user model's handler functions", () => {
	it('Post method should add a user', async () => {
		token = jwt.sign({ user: user1 }, TOKEN_SECRET);

		const response = await request
			.post('/users')
			.set('Authorization', `Bearer ${token}`)
			.send(user1);
		expect(response.status).toEqual(200);
	});
	it('Index method returns a list of all users', async () => {
		const response = await request
			.get('/users')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});
	it('Show method should return specified user', async () => {
		const response = await request
			.get('/users/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});
	it('Auth method should authenticate a user', async () => {
		const user = {
			username: user1.username,
			password: user1.hash_password,
		};
		const response = await request
			.get('/auth')
			.set('Authorization', `Bearer ${token}`)
			.send(user);
		expect(response.status).toEqual(200);
	});
	it('Delete method deletes a user', async () => {
		const response = await request
			.delete('/users/1')
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toEqual(200);
	});
	it('The endpoints have to be verified successfully before accessing them', async () => {
		const response = await request.get('/users');
		expect(response.status).toEqual(401);
	});
});
