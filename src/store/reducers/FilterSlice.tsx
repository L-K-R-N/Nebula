import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISortingOption } from '@/models/Filter.types';

// export interface projectRequestAction {
//     type: filterActionTypes.PROJECT_REQUEST;
//     payload: string;
// }

// export interface sortingByAction {
//     type: filterActionTypes.SORTING_BY;
//     payload: 'title' | 'desc' | 'date';
// }

// export type FilterAction = projectRequestAction | sortingByAction;

// export const filterReducer = (state = initialState, action: FilterAction): FilterState => {
//     switch (action.type) {
//         case filterActionTypes.PROJECT_REQUEST:
//             return {...state, projectRequest: action.payload};
//         case filterActionTypes.SORTING_BY:
//             return {...state, sortingBy: action.payload};
//         default:
//             return state;
//     }
// }

export interface IFilterState {
   search: string;
   sortingBy: ISortingOption;
}

const initialState: IFilterState = {
   search: '',
   sortingBy: {
      label: 'По названию',
      value: 'title',
   },
};

export const FilterSlice = createSlice({
   name: 'FilterSlice',
   initialState,
   reducers: {
      setSearch: (state, action: PayloadAction<string>) => {
         state.search = action.payload;
      },
      setSorting: (state, action: PayloadAction<ISortingOption>) => {
         state.sortingBy = action.payload;
      },
   },
});

export default FilterSlice.reducer;

export const { setSearch, setSorting } = FilterSlice.actions;
