import express, { Request, Response, NextFunction } from 'express';
import UserStore, { User } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();
const TOKEN_SECRET = process.env.TOKEN_SECRET as unknown as string;

const index = async (_req: Request, res: Response) => {
	try {
		const users = await store.index();
		res.json(users);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const create = async (req: Request, res: Response) => {
	const user1: User = {
		name: req.body.name,
		password: req.body.password,
	};
	try {
		const newUser = await store.create(user1);
		const token = jwt.sign({ user: newUser }, TOKEN_SECRET);
		res.json(token);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const user = await store.show(req.params.id);
		res.json(user);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const update = async (req: Request, res: Response) => {
	const user1: User = {
		id: req.params.id,
		name: req.body.name,
		password: req.body.password,
	};
	try {
		const updatedUser = await store.update(user1);
		const token = jwt.sign({ user: updatedUser }, TOKEN_SECRET);
		res.json(token);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const destroy = async (req: Request, res: Response) => {
	try {
		const deleted = await store.delete(req.params.id);
		res.json(deleted);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const authenticate = async (req: Request, res: Response) => {
	const name = req.body.name;
	const password = req.body.password;
	try {
		const isUserAuthenticated = await store.authenticate(name, password);
		const result = isUserAuthenticated || 'User does not exist or password is invalid';
		res.json(result);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

export const verifyAuthToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authorizationHeader = req.headers
			.authorization as unknown as string;
		const token = authorizationHeader.split(' ')[1];
		// eslint-disable-next-line
		const decoded = jwt.verify(token, TOKEN_SECRET);
		next();
	} catch (err) {
		res.status(401);
		res.json(err);
	}
};

const usersRoutes = (app: express.Application) => {
	app.post('/signup', create);
	app.get('/login', authenticate);
	app.get('/users', verifyAuthToken, index);
	app.get('/users/:id', verifyAuthToken, show);
	app.put('/users/:id', verifyAuthToken, update);
	app.delete('/users/:id', verifyAuthToken, destroy);
};

export default usersRoutes;
