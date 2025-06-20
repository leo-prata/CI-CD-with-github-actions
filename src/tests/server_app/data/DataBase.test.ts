import { DataBase } from '../../../app/server_app/data/DataBase';
import * as IdGenerator from '../../../app/server_app/data/IdGenerator';

type someTypeWithId = {
	id: string;
	name: string;
	color: string;
};

describe('Database test suite', () => {
	let sut: DataBase<someTypeWithId>;
	const fakeId = '1234';
	const someObject = {
		id: '',
		name: 'test',
		color: 'red',
	};
	const someObject2 = {
		id: '',
		name: 'name',
		color: 'red',
	};

	beforeEach(() => {
		sut = new DataBase<someTypeWithId>();
		jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId);
	});

	it('should return id after insert', async () => {
		const actual = await sut.insert({
			id: '',
		} as any);

		expect(actual).toBe(fakeId);
	});

	it('should get element after insert', async () => {
		const id = await sut.insert(someObject);
		const actual = await sut.getBy('id', id);

		expect(actual).toBe(someObject);
	});

	it('should find all elements with the same property', async () => {
		await sut.insert(someObject);
		await sut.insert(someObject2);

		const expected = [someObject, someObject2];

		const actual = await sut.findAllBy('color', 'red');

		expect(actual).toEqual(expected);
	});

	it('should change the color of the object', async () => {
		const id = await sut.insert(someObject);
		const expectedColor = 'blue';

		await sut.update(id, 'color', expectedColor);
		const object = await sut.getBy('id', id);

		expect(object?.color).toBe(expectedColor);
	});

	it('should delete the object', async () => {
		const id = await sut.insert(someObject);
		await sut.delete(id);

		const actual = await sut.getBy('id', id);

		expect(actual).toBeUndefined();
	});

	it('should return all elements', async () => {
		await sut.insert(someObject);
		await sut.insert(someObject2);

		const expected = [someObject, someObject2];
		const actual = await sut.getAllElements();

		expect(actual).toEqual(expected);
	});
});
