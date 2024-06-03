import ExtendedMockAdapter from '@mock-api/ExtendedMockAdapter';

export const usersApiMocks = (mock: ExtendedMockAdapter) => {
	console.log("Hi undefined");
	mock.onGet('/retrieve/users').reply((config) => {
		console.log("Hi mock get users")
		const data = JSON.parse(config.data as string) as { uid: string };
		console.log(data.uid);
		const { uid } = data;

		const error = [];

		if (error.length === 0) {
			const response = {
				uid,
			};

			return [200, response];
		}

		return [400, error];
	});
}