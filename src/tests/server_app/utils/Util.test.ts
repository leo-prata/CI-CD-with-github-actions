import { getRequestBody } from '../../../app/server_app/utils/Utils';
import { IncomingMessage } from 'http';

const requestMock = {
	on: jest.fn(),
};

const someObject = {
	name: 'someName',
	age: 25,
	city: 'someCity',
};

const someObjectString = JSON.stringify(someObject);

describe('get request body test suite', () => {
	it('should return object for valid JSON', async () => {
		requestMock.on.mockImplementation((event, cb) => {
			if (event == 'data') {
				cb(someObjectString);
			} else {
				cb();
			}
		});

		const actual = await getRequestBody(requestMock as any as IncomingMessage);
		expect(actual).toEqual(someObject);
	});

	it('should throw error for invalid JSON', async () => {
		requestMock.on.mockImplementation((event, cb) => {
			if (event == 'data') {
				cb('a' + someObjectString);
			} else {
				cb();
			}
		});

		await expect(getRequestBody(requestMock as any))
			.rejects // match object with message property
			.toThrow(new RegExp('Unexpected token'));
	});

	it('should throw error for unexpected error', async () => {
		const someError = new Error('Something went wrong!');
		requestMock.on.mockImplementation((event, cb) => {
			if (event == 'error') {
				cb(someError);
			}
		});
		await expect(getRequestBody(requestMock as any)).rejects.toThrow(
			someError.message
		);
	});
});
