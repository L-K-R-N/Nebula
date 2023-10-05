import { combineReducers } from "redux";
import {filterReducer} from './FilterReducer'

export const rootReducer = combineReducers({
    filter: filterReducer,
})

export type RootState = ReturnType<typeof rootReducer>