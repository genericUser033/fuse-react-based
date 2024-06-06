import ExtendedMockAdapter from '@mock-api/ExtendedMockAdapter';
import mockApi from '../mock-api.json';
import { Staff } from '../../app/staff/Staff.ts';
import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

import { selectSearchText } from '../../app/staff/StaffSlice.ts';

export const addTagTypes = ['staffs'] as const;
const StaffApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: build => ({
			getStaffList: build.query<GetStaffListApiResponse, GetStaffListApiArg>({
				query: () => ({ url: `/mock-api/retrieve/staffs` }), //already mocked so just call the api
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

export type GetStaffListApiResponse = /** status 200 OK */ Staff[];//return type
export type GetStaffListApiArg = void;//arguments?

export const {
	useGetStaffListQuery //just a name
} = StaffApi;// the value

/**
 * Select filtered contacts
 */
export const selectFilteredStaffList = (staff: Staff[]) =>
	createSelector([selectSearchText], (searchText) => {
		if (!staff) {
			return [];
		}

		if (searchText.length === 0) {
			return staff;
		}

		console.log("searchText ", searchText);
		console.log("filterArrayByString ", FuseUtils.filterArrayByString<Staff>(staff, searchText));
		return FuseUtils.filterArrayByString<Staff>(staff, searchText);
	});

export const selectGroupedFilteredStaff = (staff: Staff[]) =>
	createSelector([selectFilteredStaffList(staff)], (staff) => {
		if (!staff) {
			return [];
		}
		const sortedStaff = [...staff]?.sort((a, b) =>
			a?.name?.localeCompare(b.name, 'es', { sensitivity: 'base' })
		);
		console.log("sortedStaff ", sortedStaff);

		const groupedObject: {
			[key: string]: GroupedStaff;
		} = sortedStaff?.reduce<AccumulatorType>((r, e) => {
			// get first letter of name of current element
			const group = e.englishName[0];

			// if there is no property in accumulator with this letter create it
			if (!r[group]) r[group] = { group, children: [e] };
			// if there is push current element to children array for that letter
			else {
				r[group]?.children?.push(e);
			}

			// return accumulator
			return r;
		}, {});

		return groupedObject;
	});

export type GroupedStaff = {
	group: string;
	children?: Staff[];
};

export type AccumulatorType = {
	[key: string]: GroupedStaff;
};
