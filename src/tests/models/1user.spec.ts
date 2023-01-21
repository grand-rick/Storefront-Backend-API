import UserStore, { User } from '../../models/user';

const store = new UserStore();

describe('User Model', () => {
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

	it('create method should add a user', async () => {
		const result: User = await store.create({
			first_name: 'Some',
			last_name: 'Name',
			username: 'Test User',
			hash_password: 'randomPassword',
		});
		expect(result).toBeDefined();
	});

	it('index method should return a list of users', async () => {
		const result = await store.index();
		expect(result).toBeDefined();
	});

	it('show method should return the correct user', async () => {
		const result = await store.show('3');
		expect(result).toBeDefined();
	});

	it('delete method should remove the user', async () => {
		await store.delete('3');
		const result = await store.index();
		expect(result).toEqual([]);
	});

	it('authenticate method works', async () => {
		const result = await store.authenticate('Test User', 'randomPassword');
		expect(result).toBeDefined();
	});
});
