import express, { Request, Response } from 'express';
import DashboardQueries from '../services/dashboard';
import { verifyAuthToken } from './users';

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
	try {
		const products = await dashboard.productsInOrders();
		res.json(products);
	} catch (err) {
		throw new Error(`Unable to show products in active orders`);
	}
};

const topFiveExpensiveProducts = async (_req: Request, res: Response) => {
	try {
		const expensiveProducts = await dashboard.topFiveExpensiveProducts();
		res.json(expensiveProducts);
	} catch (err) {
		throw new Error(`Unable to show expensive products`);
	}
};

const usersWithActiveOrders = async (_req: Request, res: Response) => {
	try {
		const users = await dashboard.usersWithActiveOrders();
		res.json(users);
	} catch (err) {
		throw new Error(`Unable to show users with active orders`);
	}
};

const dashboardRoutes = (app: express.Application) => {
	app.get('/products_in_orders', verifyAuthToken, productsInOrders);
	app.get('/expensive_products', verifyAuthToken, topFiveExpensiveProducts);
	app.get(
		'/users_with_active_orders',
		verifyAuthToken,
		usersWithActiveOrders
	);
};

export default dashboardRoutes;
