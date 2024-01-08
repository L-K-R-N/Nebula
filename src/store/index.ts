import {combineReducers} from 'redux'
// import { rootReducer } from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import FilterReducer from './reducers/FilterSlice'
import ProjectsReducer from './reducers/ProjectsSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
// export const store = createStore(rootReducer)

const rootReducer = combineReducers({
    FilterReducer,
    ProjectsReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;