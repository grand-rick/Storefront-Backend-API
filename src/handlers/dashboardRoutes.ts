import express, { Request, Response } from 'express';
import DashboardQueries from '../services/dashboard';

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
	const products = await dashboard.productsInOrders();
	res.json(products);
};

const topFiveExpensiveProducts = async (_req: Request, res: Response) => {
	const expensiveProducts = await dashboard.topFiveExpensiveProducts();
	res.json(expensiveProducts);
};

const usersWithActiveOrders = async (_req: Request, res: Response) => {
	const users = await dashboard.usersWithActiveOrders();
	res.json(users);
};

const dashboardRoutes = (app: express.Application) => {
	app.get('/products_in_orders', productsInOrders);
    app.get('/expensive_products', topFiveExpensiveProducts);
    app.get('/users_with_active_orders', usersWithActiveOrders);
};

export default dashboardRoutes;
