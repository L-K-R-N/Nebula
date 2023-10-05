export enum filterActionTypes {
    PROJECT_REQUEST = 'PROJECT_REQUEST',
    SORTING_BY = 'SORTING_BY',
}

const initialState = {
    projectRequest: '',
    sortingBy: 'title'
}

export interface projectRequestAction {
    type: filterActionTypes.PROJECT_REQUEST;
    payload: string;
}

export interface sortingByAction {
    type: filterActionTypes.SORTING_BY;
    payload: 'title' | 'desc' | 'date';
}

export type FilterAction = projectRequestAction | sortingByAction;

export interface FilterState {
    projectRequest: string;
    sortingBy: string;
}

export const filterReducer = (state = initialState, action: FilterAction): FilterState => {
    switch (action.type) {
        case filterActionTypes.PROJECT_REQUEST:
            return {...state, projectRequest: action.payload};
        case filterActionTypes.SORTING_BY:
            return {...state, sortingBy: action.payload};
        default: 
            return state;
    }
}