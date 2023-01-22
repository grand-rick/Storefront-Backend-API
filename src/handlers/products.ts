import express, { Request, Response } from 'express';
import ProductStore, { Product } from '../models/product';
import { verifyAuthToken } from './users';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
	try {
		const products = await store.index();
		res.json(products);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const create = async (req: Request, res: Response) => {
	const product1: Product = {
		name: req.body.name,
		price: req.body.price,
	};
	try {
		const newProduct = await store.create(product1);
		res.json(newProduct);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const product = await store.show(req.params.id);
		res.json(product);
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

const productsRoutes = (app: express.Application) => {
	app.post('/products', verifyAuthToken, create);
	app.get('/products', index);
	app.get('/products/:id', show);
	app.delete('/products/:id', verifyAuthToken, destroy);
};

export default productsRoutes;
