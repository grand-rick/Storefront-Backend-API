import express, { Request, Response } from 'express';
import OrderStore, { Order } from '../models/order';
import { verifyAuthToken } from './users';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
	try {
		const orders = await store.index();
		res.json(orders);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const create = async (req: Request, res: Response) => {
	const order1: Order = {
		status: req.body.status,
		productQuantity: req.body.productQuantity,
		productId: req.body.productId,
		userId: req.body.userId,
	};
	try {
		const newOrder = await store.create(order1);
		res.json(newOrder);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const order = await store.show(req.params.id);
		res.json(order);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const ordersRoutes = (app: express.Application) => {
	app.post('/orders', verifyAuthToken, create);
	app.get('/orders', index);
	app.get('/orders/:id', show);
};

export default ordersRoutes;
