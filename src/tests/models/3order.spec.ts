import OrderStore, { Order } from '../../models/order';
import ProductStore, { Product } from '../../models/product';
import UserStore, { User } from '../../models/user';

const store = new OrderStore();
const user_store = new UserStore();
const product_store = new ProductStore();

const user1: User = {
	first_name: 'Some',
	last_name: 'Name',
	username: 'Test User',
	hash_password: 'randomPassword',
};
const product1: Product = {
	name: 'Bed',
	price: '500',
};
const order1: Order = {
	status: 'active',
	product_quantity: '50',
	product_id: '4',
	user_id: '4',
};

describe('Order Model', () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});

	it('create method should add an order', async () => {
		const user = await user_store.create(user1);
		const product = await product_store.create(product1);
		const newOrder: Order = await store.create(order1);
		expect(newOrder).toEqual({
			id: 2,
			status: 'active',
			product_quantity: '50',
			product_id: 4,
			user_id: 4,
		});
	});

	it('index method should return a list of orders', async () => {
		const result = await store.index();
		expect(result).toEqual([
			{
				id: 2,
				status: 'active',
				product_quantity: '50',
				product_id: 4,
				user_id: 4,
			},
		]);
	});

	it('show method should return the correct order', async () => {
		const result = await store.show('2');
		expect(result).toEqual({
			id: 2,
			status: 'active',
			product_quantity: '50',
			product_id: 4,
			user_id: 4,
		});
	});

	it('addProduct method should add products in orders', async () => {
		const quantity = order1.product_quantity;
		const orderId = '2';
		const productId = '4';
		const result = await store.addProduct(quantity, orderId, productId);
		expect(result).toBeDefined();
	});

	it('deleteProduct method should delete products in orders', async () => {
		const result = await store.deleteProduct('4');
		expect(result).toEqual('Deleted');
	});

	it('delete method should remove the order', async () => {
		// Removing the user and product created in testing the create method
		await user_store.delete('2');
		await product_store.delete('1');

		await store.delete('2');
		const result = await store.index();
		expect(result).toEqual([]);
	});
});
