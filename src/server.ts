import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import usersRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';
import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT;
const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan('common'));
app.use(bodyParser.json());

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.get('/', (_req: Request, res: Response) => {
	res.json('This is the Homepage');
});

app.listen(port, () => {
	console.log(`Server started on http://localhost${port}`);
});
