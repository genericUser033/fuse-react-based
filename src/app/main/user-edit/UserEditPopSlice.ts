import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';

export const userEditPopSlice = createSlice({
	name: 'userEditPop',
	initialState: { open: false },
	reducers: {
		toggleUserEditPopUp: (state) => {
			state.open = !state.open;
		}
	},
	selectors: {
		selectUserEditPopUpOpen: (state) => state.open
	}
});

rootReducer.inject(userEditPopSlice);
const injectedSlice = userEditPopSlice.injectInto(rootReducer);
export const { selectUserEditPopUpOpen } = injectedSlice.selectors;

export const { toggleUserEditPopUp } = userEditPopSlice.actions;

export type dataSliceType = typeof userEditPopSlice;
