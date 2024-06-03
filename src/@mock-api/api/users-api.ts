import ExtendedMockAdapter from '@mock-api/ExtendedMockAdapter';

export const usersApiMocks = (mock: ExtendedMockAdapter) => {
	console.log("Hi undefined");
	mock.onGet('/retrieve/users').reply((config) => {
		console.log("Hi mock get users")
		const data = JSON.parse(config.data as string) as { uid: string };
		console.log(data.uid);
		const { uid } = data;

		// const user = _.cloneDeep(usersApi.find((_user) => _user.data.email === email));

		const error = [];

		// if (!user) {
		// 	error.push({
		// 		type: 'email',
		// 		message: 'Check your email address'
		// 	});
		// }
		//
		// if (user && user.password !== password) {
		// 	error.push({
		// 		type: 'password',
		// 		message: 'Check your password'
		// 	});
		// }

		if (error.length === 0) {
			// delete (user as Partial<UserAuthType>).password;
			//
			// const access_token = generateJWTToken({ id: user.uid });

			const response = {
				uid,
			};

			return [200, response];
		}

		return [400, error];
	});
}