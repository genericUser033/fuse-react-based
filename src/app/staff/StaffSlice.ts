import { createSlice, WithSlice } from '@reduxjs/toolkit';
import React from 'react';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState = { searchText: '' };

export const staffAppSlice = createSlice({
	name: 'staffApp',
	initialState,
	reducers: {
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload as string;
			},
			prepare: (event: React.ChangeEvent<HTMLInputElement>) => ({
				payload: `${event?.target?.value}` || initialState,
				meta: undefined,
				error: null
			})
		},
		resetSearchText: (state) => {
			state.searchText = initialState.searchText;
		}
	},
	selectors: {
		selectSearchText: (state) => state.searchText
	}
});

rootReducer.inject(staffAppSlice);
const injectedSlice = staffAppSlice.injectInto(rootReducer);

declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof staffAppSlice> {}
}

export const { setSearchText, resetSearchText } = staffAppSlice.actions;

export type searchTextSliceType = typeof staffAppSlice;

export const { selectSearchText } = injectedSlice.selectors;

const searchTextReducer = staffAppSlice.reducer;

export default searchTextReducer;