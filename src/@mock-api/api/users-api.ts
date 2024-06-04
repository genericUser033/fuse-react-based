import ExtendedMockAdapter from '@mock-api/ExtendedMockAdapter';
import mockApi from '../mock-api.json';
import { Staff } from '../../app/staff/Staff.ts';
import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['staffs'] as const;
const StaffApi = api
	.enhanceEndpoints({
			addTagTypes
	})
	.injectEndpoints({
		endpoints: build => ({
			getStaffList: build.query<GetStaffListApiResponse, GetStaffListApiArg>({
				query: () => ({ url: `/mock-api/retrieve/staffs` }),
				providesTags: ['staffs']
			}),
		}),
		overrideExisting: false
	});

export const usersApiMocks = (mock: ExtendedMockAdapter) => {
	const staffDB = mockApi.components.examples.staffs.value as Staff[];

	mock.onGet('/retrieve/staffs').reply(() => {
		return [200, staffDB];
	});
}

export type GetStaffListApiResponse = /** status 200 OK */ Staff[];
export type GetStaffListApiArg = void;

export const {
	useGetStaffListQuery
} = StaffApi;
