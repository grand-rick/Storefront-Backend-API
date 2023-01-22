import ProductStore, { Product } from '../../models/product';

const store = new ProductStore();

describe('Product Model', () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(store.delete).toBeDefined();
	});

	it('create method should add a product', async () => {
		const result: Product = await store.create({
			name: 'Bridge',
			price: '250',
		});
		expect(result).toEqual({
			id: 1,
			name: 'Bridge',
			price: '250',
		});
	});

	it('index method should return a list of products', async () => {
		const result = await store.index();
		expect(result).toEqual([
			{
				id: 1,
				name: 'Bridge',
				price: '250',
			},
		]);
	});

	it('show method should return the correct product', async () => {
		const result = await store.show('1');
		expect(result).toEqual({
			id: 1,
			name: 'Bridge',
			price: '250',
		});
	});

	it('delete method should remove the product', async () => {
		await store.delete('1');
		const result = await store.index();
		expect(result).toEqual([]);
	});
});
