import {combineReducers} from 'redux'
// import { rootReducer } from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import FilterReducer from './reducers/FilterSlice'
import ProjectsReducer from './reducers/ProjectsSlice'
import UserReducer from './reducers/UserSlice'
// export const store = createStore(rootReducer)

const rootReducer = combineReducers({
    FilterReducer,
    ProjectsReducer,
    UserReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

